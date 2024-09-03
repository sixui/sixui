import type {
  DOMAttributes,
  HoverEvent,
  PressEvents,
} from '@react-types/shared';
import { accumulate } from '@olivierpascal/helpers';
import { useMemo, useRef } from 'react';
import { useFocusRing, useHover, usePress, type HoverEvents } from 'react-aria';

export type IInteraction =
  | 'disabled'
  | 'focused'
  | 'pressed'
  | 'dragged'
  | 'hovered';

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
   * @defaultValue 'replace'
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
const activeTriggers: Array<EventTarget> = [];

export const useInteractions = <TElement extends HTMLElement>(
  props?: IUseInteractionsProps,
): IUseInteractionsResult<TElement> => {
  const {
    baseState,
    mergeStrategy = 'replace',
    disabled,
    dragged,
    isTextInput,
  } = props ?? {};

  const triggerRef = useRef<TElement>(null);

  const currentStateReplaced = baseState && mergeStrategy === 'replace';
  const { focusProps, isFocusVisible } = useFocusRing({
    isTextInput,
  });
  const focused = isFocusVisible && !disabled;

  const currentTrigger = useRef<EventTarget | null>(null);
  const { hoverProps, isHovered: hoveredWithin } = useHover({
    ...props?.hoverEvents,
    onHoverStart: (event: HoverEvent) => {
      props?.hoverEvents?.onHoverStart?.(event);
      currentTrigger.current = event.target;
      activeTriggers.unshift(event.target);
    },
    onHoverEnd: (event: HoverEvent) => {
      props?.hoverEvents?.onHoverEnd?.(event);
      currentTrigger.current = null;
      activeTriggers.shift();
    },
    isDisabled: disabled || currentStateReplaced,
  });

  const { pressProps, isPressed: pressed } = usePress({
    ...props?.pressEvents,
    isDisabled: disabled || currentStateReplaced,
  });

  const hovered = hoveredWithin && currentTrigger.current === activeTriggers[0];

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
      disabled,
      pressed,
      dragged,
      focused,
      hovered,
    }),
    [disabled, pressed, dragged, focused, hovered],
  );

  const state = useMemo<IInteractions>(() => {
    if (disabled) {
      return {
        disabled,
      };
    }

    return baseState
      ? currentStateReplaced
        ? baseState
        : accumulate(currentState, baseState)
      : currentState;
  }, [disabled, baseState, currentStateReplaced, currentState]);

  return {
    triggerProps,
    triggerRef,
    baseState,
    state,
  };
};
