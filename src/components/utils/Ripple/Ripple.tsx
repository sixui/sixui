import * as React from 'react';

import type { IPoint } from '@/helpers/types';
import type { IContainer } from '@/helpers/Container';
import type { IRippleStyleKey, IRippleStyleVarKey } from './Ripple.styledefs';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { EASING } from '@/helpers/animation';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';

export interface IRippleProps
  extends IContainer<IRippleStyleKey, IRippleStyleVarKey> {
  for?: React.RefObject<HTMLElement>;
  disabled?: boolean;
}

const PRESS_GROW_MS = 450;
const MINIMUM_PRESS_MS = 225;
const INITIAL_ORIGIN_SCALE = 0.2;
const PADDING = 10;
const SOFT_EDGE_MINIMUM_SIZE = 75;
const SOFT_EDGE_CONTAINER_RATIO = 0.35;
const PRESS_PSEUDO = '::after';
const ANIMATION_FILL = 'forwards';

/**
 * Delay reacting to touch so that we do not show the ripple for a swipe or
 * scroll interaction.
 */
const TOUCH_DELAY_MS = 150;

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

const isTouch = ({ pointerType }: PointerEvent): boolean =>
  pointerType === 'touch';

export const Ripple: React.FC<IRippleProps> = ({
  visualState,
  for: forElementRef,
  disabled,
  ...props
}) => {
  const theme = useComponentTheme('Ripple');

  const styleProps = React.useMemo(
    () =>
      stylePropsFactory<IRippleStyleKey>(
        stylesCombinatorFactory(theme.styles, props.styles),
      ),
    [theme.styles, props.styles],
  );

  const [hovered, setHovered] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);
  const [host, setHost] = React.useState<HTMLDivElement | null>();

  const rippleStartEventRef = React.useRef<PointerEvent>();
  const stateRef = React.useRef<IState>(IState.Inactive);
  const initialSizeRef = React.useRef(0);
  const rippleScaleRef = React.useRef(1);
  const rippleSizeRef = React.useRef(0);
  const surfaceRef = React.useRef<HTMLDivElement>(null);
  const checkBoundsAfterContextMenuRef = React.useRef(false);
  const growAnimationRef = React.useRef<Animation>();

  const getControl = React.useCallback(
    () => (forElementRef ? forElementRef.current : host?.parentElement),
    [forElementRef, host],
  );

  const inBounds = React.useCallback(
    (event: PointerEvent): boolean => {
      if (!host) {
        return false;
      }

      const { top, left, bottom, right } = host.getBoundingClientRect();
      const x = event.clientX - left;
      const y = event.clientY - top;

      return x >= left && x <= right && y >= top && y <= bottom;
    },
    [host],
  );

  /**
   * Returns `true` if
   *  - the ripple element is enabled
   *  - the pointer is primary for the input type
   *  - the pointer is the pointer that started the interaction, or will start
   * the interaction
   *  - the pointer is a touch, or the pointer state has the primary button
   * held, or the pointer is hovering
   */
  const shouldReactToEvent = React.useCallback(
    (event: PointerEvent) => {
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

      return isTouch(event) || isPrimaryButton;
    },
    [disabled],
  );

  const determineRippleSize = React.useCallback(() => {
    if (!host) {
      return;
    }

    const { height, width } = host.getBoundingClientRect();
    const maxDim = Math.max(height, width);
    const softEdgeSize = Math.max(
      SOFT_EDGE_CONTAINER_RATIO * maxDim,
      SOFT_EDGE_MINIMUM_SIZE,
    );

    const initialSize = Math.floor(maxDim * INITIAL_ORIGIN_SCALE);
    const hypotenuse = Math.sqrt(width ** 2 + height ** 2);
    const maxRadius = hypotenuse + PADDING;

    initialSizeRef.current = initialSize;
    rippleScaleRef.current = (maxRadius + softEdgeSize) / initialSize;
    rippleSizeRef.current = initialSize;
  }, [host]);

  const getNormalizedPointerEventCoords = React.useCallback(
    (pointerEvent: PointerEvent): IPoint | null => {
      if (!host) {
        return null;
      }

      const { scrollX, scrollY } = window;
      const { left, top } = host.getBoundingClientRect();
      const documentX = scrollX + left;
      const documentY = scrollY + top;
      const { pageX, pageY } = pointerEvent;

      return {
        x: pageX - documentX,
        y: pageY - documentY,
      };
    },
    [host],
  );

  const getTranslationCoordinates = React.useCallback(
    (
      positionEvent?: PointerEvent | MouseEvent,
    ): {
      startPoint: IPoint;
      endPoint: IPoint;
    } | null => {
      if (!host) {
        return null;
      }

      const { width, height } = host.getBoundingClientRect();
      // end in the center
      const endPoint = {
        x: (width - initialSizeRef.current) / 2,
        y: (height - initialSizeRef.current) / 2,
      };

      const startPoint = (positionEvent
        ? getNormalizedPointerEventCoords(positionEvent as PointerEvent)
        : undefined) ?? {
        x: width / 2,
        y: height / 2,
      };

      // center around start point
      const centeredStartPoint = {
        x: startPoint.x - initialSizeRef.current / 2,
        y: startPoint.y - initialSizeRef.current / 2,
      };

      return { startPoint: centeredStartPoint, endPoint };
    },
    [host, getNormalizedPointerEventCoords],
  );

  const startPressAnimation = React.useCallback(
    (
      _: PointerEvent | MouseEvent,
      positionEvent?: PointerEvent | MouseEvent,
    ): void => {
      if (!surfaceRef.current) {
        return;
      }

      setPressed(true);
      growAnimationRef.current?.cancel();
      determineRippleSize();
      const translationCoordinates = getTranslationCoordinates(positionEvent);
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
          pseudoElement: PRESS_PSEUDO,
          duration: PRESS_GROW_MS,
          easing: EASING.STANDARD,
          fill: ANIMATION_FILL,
        },
      );
    },
    [getTranslationCoordinates, determineRippleSize],
  );

  const endPressAnimation = React.useCallback(async () => {
    stateRef.current = IState.Inactive;
    const animation = growAnimationRef.current;
    let pressAnimationPlayState = Infinity;
    if (typeof animation?.currentTime === 'number') {
      pressAnimationPlayState = animation.currentTime;
    } else if (animation?.currentTime) {
      pressAnimationPlayState = animation.currentTime.to('ms').value;
    }

    if (pressAnimationPlayState >= MINIMUM_PRESS_MS) {
      setPressed(false);

      return;
    }

    await new Promise((resolve) => {
      setTimeout(resolve, MINIMUM_PRESS_MS - pressAnimationPlayState);
    });

    if (growAnimationRef.current !== animation) {
      // A new press animation was started. The old animation was canceled and
      // should not finish the pressed state.
      return;
    }

    setPressed(false);
  }, []);

  React.useEffect(() => {
    if (!disabled && !getControl()?.matches(':hover')) {
      setHovered(false);
    }
  }, [disabled, getControl]);

  const handlePointerEnter = React.useCallback(
    (event: PointerEvent) => {
      if (!shouldReactToEvent(event)) {
        return;
      }

      setHovered(true);
    },
    [shouldReactToEvent],
  );

  const handlePointerLeave = React.useCallback(
    (event: PointerEvent) => {
      if (!shouldReactToEvent(event)) {
        return;
      }

      setHovered(false);

      // Release a held mouse or pen press that moves outside the element.
      if (stateRef.current !== IState.Inactive) {
        void endPressAnimation();
      }
    },
    [shouldReactToEvent, endPressAnimation],
  );

  const handlePointerDown = React.useCallback(
    (event: PointerEvent): void => {
      if (!shouldReactToEvent(event)) {
        return;
      }

      rippleStartEventRef.current = event;
      if (!isTouch(event)) {
        stateRef.current = IState.WaitingForClick;
        startPressAnimation(event, event);

        return;
      }

      // after a longpress contextmenu event, an extra `pointerdown` can be
      // dispatched to the pressed element. Check that the down is within
      // bounds of the element in this case.
      if (checkBoundsAfterContextMenuRef.current && !inBounds(event)) {
        return;
      }

      checkBoundsAfterContextMenuRef.current = false;

      // Wait for a hold after touch delay
      stateRef.current = IState.TouchDelay;
      void new Promise((resolve) => {
        setTimeout(resolve, TOUCH_DELAY_MS);
      }).then(() => {
        if (stateRef.current !== IState.TouchDelay) {
          return;
        }

        stateRef.current = IState.Holding;
        startPressAnimation(event, event);
      });
    },
    [shouldReactToEvent, startPressAnimation, inBounds],
  );

  const handlePointerUp = React.useCallback(
    (event: PointerEvent) => {
      if (!shouldReactToEvent(event)) {
        return;
      }

      if (stateRef.current === IState.Holding) {
        stateRef.current = IState.WaitingForClick;

        return;
      }

      if (stateRef.current === IState.TouchDelay) {
        stateRef.current = IState.WaitingForClick;
        startPressAnimation(event, rippleStartEventRef.current);

        return;
      }
    },
    [shouldReactToEvent, startPressAnimation],
  );

  const handlePointerCancel = React.useCallback(
    (event: PointerEvent): void => {
      if (!shouldReactToEvent(event)) {
        return;
      }

      void endPressAnimation();
    },
    [shouldReactToEvent, endPressAnimation],
  );

  const handleClick = React.useCallback(
    (event: MouseEvent) => {
      // Click is a MouseEvent in Firefox and Safari, so we cannot use
      // `shouldReactToEvent`
      if (disabled) {
        return;
      }
      if (stateRef.current === IState.WaitingForClick) {
        void endPressAnimation();

        return;
      }

      if (stateRef.current === IState.Inactive) {
        // keyboard synthesized click event
        startPressAnimation(event);
        void endPressAnimation();
      }
    },
    [disabled, startPressAnimation, endPressAnimation],
  );

  const handleContextMenu = React.useCallback(() => {
    if (disabled) {
      return;
    }

    checkBoundsAfterContextMenuRef.current = true;
    void endPressAnimation();
  }, [disabled, endPressAnimation]);

  React.useEffect(() => {
    const control = getControl();
    if (!control) {
      return;
    }

    control.addEventListener('pointerenter', handlePointerEnter);
    control.addEventListener('pointerleave', handlePointerLeave);
    control.addEventListener('pointerdown', handlePointerDown);
    control.addEventListener('pointerup', handlePointerUp);
    control.addEventListener('pointercancel', handlePointerCancel);
    control.addEventListener('click', handleClick);
    control.addEventListener('contextmenu', handleContextMenu);

    return () => {
      control.removeEventListener('pointerenter', handlePointerEnter);
      control.removeEventListener('pointerleave', handlePointerLeave);
      control.removeEventListener('pointerdown', handlePointerDown);
      control.removeEventListener('pointerup', handlePointerUp);
      control.removeEventListener('pointercancel', handlePointerCancel);
      control.removeEventListener('click', handleClick);
      control.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [
    getControl,
    handlePointerEnter,
    handlePointerLeave,
    handlePointerDown,
    handlePointerUp,
    handlePointerCancel,
    handleClick,
    handleContextMenu,
  ]);

  return (
    <div
      ref={setHost}
      {...styleProps(
        ['host', disabled && 'host$disabled', props.sx],
        [theme.vars, props.theme],
      )}
    >
      <div
        {...styleProps([
          'surface',
          (hovered || visualState?.hovered) && 'surface$hover',
          pressed && 'surface$pressed',
          !pressed && visualState?.pressed && 'surface$pressedStatic',
        ])}
        ref={surfaceRef}
      />
    </div>
  );
};
