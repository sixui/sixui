import type {
  DOMAttributes,
  HoverEvent,
  PressEvents,
} from '@react-types/shared';
import { accumulate } from '@olivierpascal/helpers';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useFocusRing, useHover, usePress, type HoverEvents } from 'react-aria';

export type IInteraction = 'focused' | 'pressed' | 'dragged' | 'hovered';

export type IInteractions = Partial<Record<IInteraction, boolean>>;

export type IUseInteractionsProps = {
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

  /** Events to handle hover interactions. */
  hoverEvents?: HoverEvents;

  /**  Events to handle press interactions. */
  pressEvents?: PressEvents;

  /** Wether the element is currently dragged. */
  dragged?: boolean;

  /** Wether the element is disabled. */
  disabled?: boolean;

  /** Wether the element is a text input. */
  isTextInput?: boolean;
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
  props?: IUseInteractionsProps,
): IUseInteractionsResult<TElement> => {
  const {
    baseState,
    mergeStrategy = 'accumulate',
    disabled,
    dragged,
    isTextInput,
  } = props ?? {};

  const triggerRef = useRef<TElement>(null);

  const currentStateReplaced = baseState && mergeStrategy === 'replace';
  const { focusProps, isFocusVisible: focused } = useFocusRing({
    isTextInput,
    // FIXME:
    within: true,
  });

  const { hoverProps } = useHover({
    ...props?.hoverEvents,
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
    isDisabled: disabled || currentStateReplaced,
  });

  const [hovered, setHovered] = useState(false);
  const handleHoverStart = useCallback(
    (event: HoverEvent) => {
      props?.hoverEvents?.onHoverStart?.(event);
      setHovered(true);
    },
    [props?.hoverEvents],
  );

  const handleHoverEnd = useCallback(
    (event: HoverEvent) => {
      props?.hoverEvents?.onHoverEnd?.(event);
      setHovered(false);
    },
    [props?.hoverEvents],
  );

  const { pressProps, isPressed: pressed } = usePress({
    ...props?.pressEvents,
    isDisabled: disabled || currentStateReplaced,
  });

  const triggerProps = useMemo<DOMAttributes>(
    () => ({
      ...hoverProps,
      ...pressProps,
      ...focusProps,
    }),
    [hoverProps, pressProps, focusProps],
  );

  const currentState: IInteractions = useMemo(
    () => ({
      pressed,
      dragged,
      focused,
      hovered,
    }),
    [pressed, dragged, focused, hovered],
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
