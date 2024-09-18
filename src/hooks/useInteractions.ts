import type { DOMAttributes, HoverEvent } from '@react-types/shared';
import type { AriaFocusRingProps, HoverProps, PressProps } from 'react-aria';
import { useCallback, useMemo, useRef, useState } from 'react';
import { accumulate } from '@olivierpascal/helpers';
import { useFocusRing, useHover, usePress } from 'react-aria';

export type IInteraction = 'focused' | 'pressed' | 'dragged' | 'hovered';

export type IInteractionEvent = 'focus' | 'press' | 'hover';

export type IInteractions = Partial<Record<IInteraction, boolean>>;

export type IUseInteractionsProps = {
  events: {
    hover?: boolean | HoverProps;
    focus?: boolean | AriaFocusRingProps;
    press?: boolean | PressProps;
  };

  /** The base interactions state of the trigger. */
  baseState?: IInteractions;

  /**
   * This strategy describes how the current state should be merged with the
   * base state.
   * - `replace`: The base state will replace the current state.
   * - `accumulate`: If the current state is true, the merged state will be
   *   true. If the current state is not true, the combined state will be
   *   equal to the base state.
   * @defaultValue 'accumulate'
   */
  mergeStrategy?: 'replace' | 'accumulate';

  /** Wether the element is currently dragged. */
  dragged?: boolean;

  /** Wether the element is disabled. */
  disabled?: boolean;
};

export type IUseInteractionsResult<TElement extends HTMLElement = HTMLElement> =
  {
    /** Props to spread on the trigger. */
    triggerProps: DOMAttributes;

    /** Ref object for the trigger element. */
    triggerRef: React.RefObject<TElement>;

    /** The untouched base interaction state of the trigger. */
    baseState?: IInteractions;

    /** The merged interaction state of the trigger. */
    state: IInteractions;
  };

/** Used to handle nested surfaces. */
const activeTriggers: Array<{
  target: EventTarget;
  onHoverStart: (event: HoverEvent) => void;
  onHoverEnd: (event: HoverEvent) => void;
}> = [];

export const useInteractions = <TElement extends HTMLElement>(
  props: IUseInteractionsProps,
): IUseInteractionsResult<TElement> => {
  const {
    events,
    baseState,
    mergeStrategy = 'accumulate',
    disabled,
    dragged,
  } = props ?? {};

  const triggerRef = useRef<TElement>(null);

  const focusOptions =
    typeof events.focus !== 'boolean' ? events.focus : undefined;
  const hoverOptions =
    typeof events.hover !== 'boolean' ? events.hover : undefined;
  const pressOptions =
    typeof events.press !== 'boolean' ? events.press : undefined;

  const currentStateReplaced = baseState && mergeStrategy === 'replace';
  const { focusProps, isFocusVisible: focused } = useFocusRing(focusOptions);

  const { hoverProps } = useHover({
    ...hoverOptions,
    onHoverStart: (event: HoverEvent) => {
      handleHoverStart(event);
      activeTriggers[0]?.onHoverEnd(event);
      activeTriggers.unshift({
        target: event.target,
        onHoverStart: handleHoverStart,
        onHoverEnd: handleHoverEnd,
      });
    },
    onHoverEnd: (event: HoverEvent) => {
      handleHoverEnd(event);
      activeTriggers.shift();
      activeTriggers[0]?.onHoverStart(event);
    },
    isDisabled: hoverOptions?.isDisabled || disabled || currentStateReplaced,
  });

  const [hovered, setHovered] = useState(false);
  const handleHoverStart = useCallback(
    (event: HoverEvent) => {
      hoverOptions?.onHoverStart?.(event);
      setHovered(true);
    },
    [hoverOptions],
  );

  const handleHoverEnd = useCallback(
    (event: HoverEvent) => {
      hoverOptions?.onHoverEnd?.(event);
      setHovered(false);
    },
    [hoverOptions],
  );

  const { pressProps, isPressed: pressed } = usePress({
    ...pressOptions,
    isDisabled: pressOptions?.isDisabled || disabled || currentStateReplaced,
  });

  const triggerProps = useMemo<DOMAttributes>(
    () => ({
      ...(events.hover ? hoverProps : undefined),
      ...(events.press ? pressProps : undefined),
      ...(events.focus ? focusProps : undefined),
    }),
    [events, hoverProps, pressProps, focusProps],
  );

  const currentState: IInteractions = useMemo(
    () => ({
      pressed: events.hover ? pressed : undefined,
      dragged,
      focused: events.focus ? focused : undefined,
      hovered: events.hover ? hovered : undefined,
    }),
    [events, pressed, dragged, focused, hovered],
  );

  const state = useMemo<IInteractions>(
    () =>
      baseState
        ? currentStateReplaced
          ? baseState
          : accumulate(currentState, baseState)
        : currentState,
    [baseState, currentStateReplaced, currentState],
  );

  return {
    triggerProps,
    triggerRef,
    baseState,
    state,
  };
};
