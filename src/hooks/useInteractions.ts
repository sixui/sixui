import type {
  DOMAttributes,
  HoverEvent,
  PressEvents,
} from '@react-types/shared';
import { accumulate } from '@olivierpascal/helpers';
import { useMemo, useRef } from 'react';
import { useFocusRing, useHover, usePress, type HoverEvents } from 'react-aria';

export type IInteractionStatus =
  | 'disabled'
  | 'focused'
  | 'pressed'
  | 'dragged'
  | 'hovered';

export type IInteractionState = Partial<Record<IInteractionStatus, boolean>>;

export type IUseInteractionsProps = {
  /** The static interaction state. */
  staticState?: IInteractionState;

  /**
   * This strategy describes how the local state should be combined with the
   * static state.
   * - `replace`: The local state will be ignored and the combined state will
   *  be equal to the static state.
   * - `accumulate`: If the local state is true, the combined state will be
   *   true. If the local state is not true, the combined state will be
   *   equal to the static state.
   * @defaultValue 'replace'
   */
  staticStateStrategy?: 'replace' | 'accumulate';

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

  /**
   * The ordered list of interaction status to determine the combined state.
   * @defaultValue ['disabled', 'dragged', 'pressed', 'hovered', 'focused']
   */
  priorities?: Array<IInteractionStatus>;
};

export type IInteractions = {
  /** Props to spread on the target. */
  targetProps: DOMAttributes;

  /** The current interaction state of the target. */
  state: IInteractionState;

  /** The static interaction state. */
  staticState?: IInteractionState;

  /** The combined interaction state of the target. */
  combinedStatus?: IInteractionStatus;
};

/** Used to handle nested surfaces. */
let activeTarget: EventTarget | null = null;

export const useInteractions = (
  props?: IUseInteractionsProps,
): IInteractions => {
  const {
    staticState,
    staticStateStrategy = 'replace',
    priorities = ['disabled', 'dragged', 'pressed', 'hovered', 'focused'],
    disabled,
    dragged,
    isTextInput,
  } = props ?? {};

  const localStateReplaced = staticState && staticStateStrategy === 'replace';
  const { focusProps, isFocusVisible: focused } = useFocusRing({
    isTextInput,
  });
  const currentTarget = useRef<EventTarget | null>(null);
  const { hoverProps, isHovered: hoveredWithin } = useHover({
    ...props?.hoverEvents,
    onHoverStart: (event: HoverEvent) => {
      props?.hoverEvents?.onHoverStart?.(event);
      currentTarget.current = event.target;
      activeTarget = event.target;
    },
    onHoverEnd: (event: HoverEvent) => {
      props?.hoverEvents?.onHoverEnd?.(event);
      currentTarget.current = null;
      activeTarget = null;
    },
    isDisabled: disabled || localStateReplaced,
  });
  const { pressProps, isPressed: pressed } = usePress({
    ...props?.pressEvents,
    isDisabled: disabled || localStateReplaced,
  });

  const hovered = hoveredWithin && activeTarget === currentTarget.current;

  const targetProps = useMemo<DOMAttributes>(
    () => ({
      ...hoverProps,
      ...pressProps,
      ...focusProps,
    }),
    [hoverProps, pressProps, focusProps],
  );

  const state = useMemo<IInteractionState>(() => {
    const localState = {
      disabled,
      pressed,
      dragged,
      focused,
      hovered,
    };

    return staticState
      ? localStateReplaced
        ? staticState
        : accumulate(localState, staticState)
      : localState;
  }, [
    staticState,
    localStateReplaced,
    disabled,
    dragged,
    pressed,
    focused,
    hovered,
  ]);

  const combinedStatus = priorities.find((status) => state[status]);

  return {
    targetProps,
    staticState,
    state,
    combinedStatus,
  };
};
