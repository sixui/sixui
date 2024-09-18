import type { FocusableElement } from '@react-types/shared';
import type {
  MouseEventHandler,
  PointerEvent,
  PointerEventHandler,
} from 'react';
import type { PressEvent } from 'react-aria';
import { useCallback, useRef, useState } from 'react';
import { delay } from '@olivierpascal/helpers';

import type { IPoint } from '~/helpers/types';

export type IUSeRippleOptions = {
  /** The delay in milliseconds after the touch start, to determine if the touch
   * is a real press, or a swipe/scroll. If the touch is a press, the ripple
   * will be shown. If the touch is a swipe or a scroll, the ripple will not be
   * shown. */
  touchDelayMs?: number;

  /** The duration in milliseconds for the ripple to grow to its full size. */
  pressGrowMs?: number;

  /** The minimum duration in milliseconds for the ripple to be shown. If the
   * press animation is less than this duration, the ripple will be shown for
   * the remaining time. */
  minimumPressMs?: number;

  /**
   * The initial scale of the ripple. The ripple will grow from this scale to
   * encompass the entire control.
   */
  initialOriginScale?: number;

  /** The padding around the control to ensure the ripple is fully visible. */
  padding?: number;

  /** The minimum size of the soft edge of the ripple. The soft edge is the
   * transparent area around the ripple that fades out. */
  softEdgeMinimumSize?: number;

  /** The ratio of the soft edge to the control size. The soft edge will be at
   * least this size. */
  softEdgeContainerRatio?: number;

  /**The pseudo element to apply the ripple to. */
  pressPseudo?: string;

  /** The fill mode for the ripple animation. */
  animationFill?: FillMode;

  /** The easing function for the ripple animation. */
  easing?: string;
};

const DEFAULT_OPTIONS = {
  touchDelayMs: 150,
  pressGrowMs: 450,
  minimumPressMs: 225,
  initialOriginScale: 0.2,
  padding: 10,
  softEdgeMinimumSize: 75,
  softEdgeContainerRatio: 0.35,
  pressPseudo: '::after',
  animationFill: 'forwards' as FillMode,
  easing: 'cubic-bezier(0.2, 0, 0, 1)',
};

export type IUseRippleProps<TElement extends HTMLElement> = {
  triggerRef: React.RefObject<TElement>;
  surfaceRef: React.RefObject<HTMLDivElement>;
  disabled?: boolean;
  options?: IUSeRippleOptions;
};

export type IUseRippleResult = {
  animating: boolean;
  onPressStart: (event: PressEvent) => void;
  onPressEnd: (event: PressEvent) => void;
  onPointerLeave: PointerEventHandler<FocusableElement>;
  onPointerCancel: PointerEventHandler<FocusableElement>;
  onContextMenu: MouseEventHandler<FocusableElement>;
};

/**
 * Interaction states for the ripple.
 *
 * On Touch:
 *  - `Inactive -> TouchDelay -> WaitingForClick -> Inactive`
 *  - `Inactive -> TouchDelay -> HOLDING -> WaitingForClick -> Inactive`
 *
 * On Mouse or Pen:
 *   - `Inactive -> WaitingForClick -> Inactive`
 */
enum IState {
  /**
   * Initial state of the control, no touch in progress.
   *
   * Transitions:
   *   - on touch down: transition to `TouchDelay`.
   *   - on mouse down: transition to `WaitingForClick`.
   */
  Inactive,

  /**
   * Touch down has been received, waiting to determine if it's a swipe or
   * scroll.
   *
   * Transitions:
   *   - on touch up: begin press; transition to `WaitingForClick`.
   *   - on cancel: transition to `Inactive`.
   *   - after `TouchDelay_MS`: begin press; transition to `HOLDING`.
   */
  TouchDelay,

  /**
   * A touch has been deemed to be a press
   *
   * Transitions:
   *  - on up: transition to `WaitingForClick`.
   */
  Holding,

  /**
   * The user touch has finished, transition into rest state.
   *
   * Transitions:
   *   - on click end press; transition to `Inactive`.
   */
  WaitingForClick,
}

const isTouch = ({ pointerType }: PressEvent | PointerEvent): boolean =>
  pointerType === 'touch';

// Used to handle overlapping surfaces.
let activeTarget: EventTarget | null = null;

export const useRipple = <TElement extends HTMLElement>(
  props: IUseRippleProps<TElement>,
): IUseRippleResult => {
  const { triggerRef, surfaceRef, options: optionsProp, disabled } = props;
  const options = { ...DEFAULT_OPTIONS, ...optionsProp };

  const [pressed, setPressed] = useState(false);
  const [animating, setAnimating] = useState(false);
  const stateRef = useRef<IState>(IState.Inactive);
  const initialSizeRef = useRef(0);
  const rippleScaleRef = useRef(1);
  const rippleSizeRef = useRef(0);
  const growAnimationRef = useRef<Animation>();

  const determineRippleSize = useCallback(() => {
    if (!triggerRef.current) {
      return;
    }

    const { height, width } = triggerRef.current.getBoundingClientRect();
    const maxDim = Math.max(height, width);
    const softEdgeSize = Math.max(
      options.softEdgeContainerRatio * maxDim,
      options.softEdgeMinimumSize,
    );

    const initialSize = Math.floor(maxDim * options.initialOriginScale);
    const hypotenuse = Math.sqrt(width ** 2 + height ** 2);
    const maxRadius = hypotenuse + options.padding;

    initialSizeRef.current = initialSize;
    rippleScaleRef.current = (maxRadius + softEdgeSize) / initialSize;
    rippleSizeRef.current = initialSize;
  }, [
    triggerRef,
    options.padding,
    options.softEdgeContainerRatio,
    options.softEdgeMinimumSize,
    options.initialOriginScale,
  ]);

  const getTranslationCoordinates = useCallback(
    (
      event: PressEvent,
    ): {
      startPoint: IPoint;
      endPoint: IPoint;
    } | null => {
      if (!triggerRef.current || !surfaceRef.current) {
        return null;
      }

      const { width, height } = triggerRef.current.getBoundingClientRect();

      // End in the center
      const endPoint = {
        x: (width - initialSizeRef.current) / 2,
        y: (height - initialSizeRef.current) / 2,
      };

      const startPoint = {
        x: event.x - surfaceRef.current.offsetLeft,
        y: event.y - surfaceRef.current.offsetTop,
      };

      // Center around start point
      const centeredStartPoint = {
        x: startPoint.x - initialSizeRef.current / 2,
        y: startPoint.y - initialSizeRef.current / 2,
      };

      return { startPoint: centeredStartPoint, endPoint };
    },
    [triggerRef, surfaceRef],
  );

  const startPressAnimation = useCallback(
    (event: PressEvent): void => {
      if (!surfaceRef?.current) {
        return;
      }

      setAnimating(true);
      growAnimationRef.current?.cancel();
      determineRippleSize();
      const translationCoordinates = getTranslationCoordinates(event);
      if (!translationCoordinates) {
        return;
      }

      const { startPoint, endPoint } = translationCoordinates;
      const translateStart = `${startPoint.x}px, ${startPoint.y}px`;
      const translateEnd = `${endPoint.x}px, ${endPoint.y}px`;
      const size = `${rippleSizeRef.current}px`;

      growAnimationRef.current = surfaceRef.current.animate(
        {
          top: [0, 0],
          left: [0, 0],
          height: [size, size],
          width: [size, size],
          transform: [
            `translate(${translateStart}) scale(1)`,
            `translate(${translateEnd}) scale(${rippleScaleRef.current})`,
          ],
        },
        {
          pseudoElement: options.pressPseudo,
          duration: options.pressGrowMs,
          easing: options.easing,
          fill: options.animationFill,
        },
      );
    },
    [
      surfaceRef,
      getTranslationCoordinates,
      determineRippleSize,
      options.animationFill,
      options.easing,
      options.pressGrowMs,
      options.pressPseudo,
    ],
  );

  const endPressAnimation = useCallback(() => {
    activeTarget = null;
    stateRef.current = IState.Inactive;
    const animation = growAnimationRef.current;

    const pressAnimationPlayState =
      typeof animation?.currentTime === 'number'
        ? animation.currentTime
        : animation?.currentTime
          ? animation.currentTime.to('ms').value
          : Infinity;

    if (pressAnimationPlayState >= options.minimumPressMs) {
      setAnimating(false);

      return;
    }
    void delay(options.minimumPressMs - pressAnimationPlayState).then(() => {
      if (growAnimationRef.current !== animation) {
        // A new press animation was started. The old animation was canceled and
        // should not finish the pressed state.
        return;
      }

      setAnimating(false);
    });
  }, [options.minimumPressMs]);

  const handlePointerDown = useCallback(
    (event: PressEvent): void => {
      if (!!activeTarget || pressed || disabled) {
        return;
      }

      activeTarget = event.target;

      if (!isTouch(event)) {
        stateRef.current = IState.WaitingForClick;
        startPressAnimation(event);

        return;
      }

      // Wait for a hold after touch delay.
      stateRef.current = IState.TouchDelay;
      void delay(options.touchDelayMs).then(() => {
        if (stateRef.current !== IState.TouchDelay) {
          return;
        }

        stateRef.current = IState.Holding;
        startPressAnimation(event);
      });
    },
    [disabled, pressed, startPressAnimation, options.touchDelayMs],
  );

  const handlePointerUp = useCallback(
    (event: PressEvent) => {
      if (disabled) {
        return;
      }

      if (stateRef.current === IState.Holding) {
        stateRef.current = IState.WaitingForClick;

        return;
      }

      if (stateRef.current === IState.TouchDelay) {
        stateRef.current = IState.WaitingForClick;
        startPressAnimation(event);

        return;
      }
    },
    [disabled, startPressAnimation],
  );

  const handlePointerLeave: PointerEventHandler<FocusableElement> = useCallback(
    (event) => {
      if (isTouch(event)) {
        return;
      }

      // Release a held mouse or pen press that moves outside the element.
      if (stateRef.current !== IState.Inactive) {
        endPressAnimation();
      }
    },
    [endPressAnimation],
  );

  const handlePressStart = useCallback(
    (event: PressEvent) => {
      setPressed(true);
      handlePointerDown(event);
    },
    [handlePointerDown],
  );

  const handlePressEnd = useCallback(
    (event: PressEvent) => {
      setPressed(false);
      handlePointerUp(event);

      if (stateRef.current !== IState.Inactive) {
        void endPressAnimation();
      }
    },
    [handlePointerUp, endPressAnimation],
  );

  return {
    animating,
    onPressStart: handlePressStart,
    onPressEnd: handlePressEnd,
    onPointerLeave: handlePointerLeave,
    onPointerCancel: endPressAnimation,
    onContextMenu: endPressAnimation,
  };
};
