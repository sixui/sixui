import { useCallback, useMemo, useRef, useState } from 'react';
import { delay } from '@olivierpascal/helpers';

import { getTranslationCoordinates } from './getTranslationCoordinates';
import { isEventInElementBounds } from './isEventInElementBounds';

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
  triggerProps?: {
    onPointerDown?: React.PointerEventHandler;
    onPointerUp?: React.PointerEventHandler;
    onPointerLeave?: React.PointerEventHandler;
    onPointerCancel?: React.PointerEventHandler;
    onClick?: React.MouseEventHandler;
    onContextMenu?: React.MouseEventHandler;
  };
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

const isTouch = ({ pointerType }: React.PointerEvent): boolean =>
  pointerType === 'touch';

export const useRipple = <TElement extends HTMLElement>(
  props: IUseRippleProps<TElement>,
): IUseRippleResult => {
  const { triggerRef, surfaceRef, options: optionsProp, disabled } = props;
  const options = { ...DEFAULT_OPTIONS, ...optionsProp };

  const [animating, setAnimating] = useState(false);
  const rippleStartEventRef = useRef<React.PointerEvent>();
  const stateRef = useRef<IState>(IState.Inactive);
  const initialSizeRef = useRef(0);
  const rippleScaleRef = useRef(1);
  const rippleSizeRef = useRef(0);
  const growAnimationRef = useRef<Animation>();
  const checkBoundsAfterContextMenuRef = useRef(false);

  /**
   * Returns `true` if:
   *  - the ripple element is enabled
   *  - the pointer is primary for the input type
   *  - the pointer is the pointer that started the interaction, or will start
   *    the interaction
   *  - the pointer is a touch, or the pointer state has the primary button
   *    held, or the pointer is hovering
   */
  const shouldReactToEvent = useCallback(
    (event: React.PointerEvent) => {
      if (disabled || !event.isPrimary) {
        return false;
      }

      if (
        rippleStartEventRef.current &&
        rippleStartEventRef.current.pointerId !== event.pointerId
      ) {
        return false;
      }

      if (event.type === 'pointerenter' || event.type === 'pointerleave') {
        return !isTouch(event);
      }

      const isPrimaryButton = event.buttons === 1;
      if (!isTouch(event) && !isPrimaryButton) {
        return false;
      }

      return true;
    },
    [disabled],
  );

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

  const startPressAnimation = useCallback(
    (event: React.PointerEvent | React.MouseEvent): void => {
      if (!surfaceRef.current) {
        return;
      }

      setAnimating(true);
      growAnimationRef.current?.cancel();
      determineRippleSize();

      if (!triggerRef.current || !initialSizeRef.current) {
        return;
      }
      const translationCoordinates = getTranslationCoordinates(
        triggerRef.current,
        surfaceRef.current,
        event,
        initialSizeRef.current,
      );

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
      triggerRef,
      surfaceRef,
      initialSizeRef,
      determineRippleSize,
      options.animationFill,
      options.easing,
      options.pressGrowMs,
      options.pressPseudo,
    ],
  );

  const endPressAnimation = useCallback(() => {
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

  const handlePointerDown: React.PointerEventHandler = useCallback(
    (event) => {
      if (!shouldReactToEvent(event)) {
        return;
      }

      event.stopPropagation();

      rippleStartEventRef.current = event;
      if (!isTouch(event)) {
        stateRef.current = IState.WaitingForClick;
        startPressAnimation(event);

        return;
      }

      // After a longpress contextmenu event, an extra `pointerdown` can be
      // dispatched to the pressed element. Check that the down is within bounds
      // of the element in this case.
      if (
        checkBoundsAfterContextMenuRef.current &&
        (!triggerRef.current ||
          !isEventInElementBounds(event, triggerRef.current))
      ) {
        return;
      }

      checkBoundsAfterContextMenuRef.current = false;

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
    [shouldReactToEvent, triggerRef, startPressAnimation, options.touchDelayMs],
  );

  const handlePointerUp: React.PointerEventHandler = useCallback(
    (event) => {
      if (!shouldReactToEvent(event)) {
        return;
      }

      event.stopPropagation();

      if (stateRef.current === IState.Holding) {
        stateRef.current = IState.WaitingForClick;

        return;
      }

      if (stateRef.current === IState.TouchDelay) {
        stateRef.current = IState.WaitingForClick;
        if (rippleStartEventRef.current) {
          startPressAnimation(rippleStartEventRef.current);
        }

        return;
      }
    },
    [shouldReactToEvent, startPressAnimation],
  );

  const handlePointerLeave: React.PointerEventHandler = useCallback(
    (event) => {
      if (!shouldReactToEvent(event)) {
        return;
      }

      // Release a held mouse or pen press that moves outside the element.
      if (stateRef.current !== IState.Inactive) {
        endPressAnimation();
      }
    },
    [shouldReactToEvent, endPressAnimation],
  );

  const handlePointerCancel: React.PointerEventHandler = useCallback(
    (event) => {
      if (!shouldReactToEvent(event)) {
        return;
      }

      endPressAnimation();
    },
    [shouldReactToEvent, endPressAnimation],
  );

  const handleClick: React.MouseEventHandler = useCallback(
    (event) => {
      // Click is a MouseEvent in Firefox and Safari, so we cannot use
      // `shouldReactToEvent`.
      if (disabled) {
        return;
      }

      event.stopPropagation();

      if (stateRef.current === IState.WaitingForClick) {
        void endPressAnimation();

        return;
      }

      if (stateRef.current === IState.Inactive) {
        // Keyboard synthesized click event
        startPressAnimation(event);
        void endPressAnimation();
      }
    },
    [disabled, startPressAnimation, endPressAnimation],
  );

  const handleContextMenu = useCallback(() => {
    if (disabled) {
      return;
    }

    checkBoundsAfterContextMenuRef.current = true;
    void endPressAnimation();
  }, [disabled, endPressAnimation]);

  const triggerProps = useMemo(
    () =>
      disabled
        ? undefined
        : {
            onPointerDown: handlePointerDown,
            onPointerUp: handlePointerUp,
            onPointerLeave: handlePointerLeave,
            onPointerCancel: handlePointerCancel,
            onClick: handleClick,
            onContextMenu: handleContextMenu,
          },
    [
      disabled,
      handlePointerDown,
      handlePointerUp,
      handlePointerLeave,
      handlePointerCancel,
      handleClick,
      handleContextMenu,
    ],
  );

  return {
    animating,
    triggerProps,
  };
};
