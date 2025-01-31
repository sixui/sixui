import type { DOMAttributes } from '@react-types/shared';
import type { AriaFocusRingProps } from 'react-aria';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { accumulate } from '@olivierpascal/helpers';
import { useFocusRing } from 'react-aria';

import { mergeProps } from '~/utils/mergeProps';

export type IInteraction = 'focused' | 'pressed' | 'dragged' | 'hovered';

export type IInteractions = Partial<Record<IInteraction, boolean>>;

export type IHoverProps = {
  onHoverStart?: (event: React.PointerEvent) => void;
  onHoverEnd?: (event: React.PointerEvent) => void;

  /**
   * Whether to trigger hover events when something inside the container element
   * is hovered (true), or only if the container itself is hovered (false).
   * @defaultValue false
   * */
  within?: boolean;
};

export type IFocusProps = AriaFocusRingProps;

export type IInteractionEvents = {
  hover?: boolean | IHoverProps;
  focus?: boolean | IFocusProps;
  press?: boolean;
};

export type IInteractionsMergeStrategy = 'replace' | 'accumulate' | 'override';

export type IUseInteractionsProps = {
  events?: IInteractionEvents;

  /** The base interactions state of the trigger. */
  baseState?: IInteractions;

  /**
   * This strategy describes how the current state should be merged with the
   * base state.
   * - `replace`: The base state will replace the current state.
   * - `accumulate`: If the current state is true, the merged state will be
   *   true. If the current state is not true, the combined state will be equal
   *   to the base state.
   * - `override`: If the current state is defined, the merged state will be the
   *   current state. If the current state is not defined, the combined state
   *   will be equal to the base state.
   * @defaultValue 'accumulate'
   */
  mergeStrategy?: IInteractionsMergeStrategy;

  /** Wether the element is currently dragged. */
  dragged?: boolean;

  /** Wether the element is disabled. */
  disabled?: boolean;

  clickThrough?: boolean;
};

export type IUseInteractionsResult<TElement extends HTMLElement = HTMLElement> =
  {
    /** Props to spread on the trigger. */
    triggerProps?: DOMAttributes;

    /** Ref object for the trigger element. */
    triggerRef: React.RefObject<TElement | null>;

    /** The untouched base interaction state of the trigger. */
    baseState?: IInteractions;

    /** The merged interaction state of the trigger. */
    state: IInteractions;
  };

/** Used to handle nested surfaces. */
const activeTriggers: Array<{
  target: EventTarget;
  onHoverStart: (event: React.PointerEvent) => void;
  onHoverEnd: (event: React.PointerEvent) => void;
}> = [];

export const useInteractions = <TElement extends HTMLElement>(
  props: IUseInteractionsProps,
): IUseInteractionsResult<TElement> => {
  const {
    events,
    baseState,
    mergeStrategy = 'accumulate',
    disabled,
    clickThrough,
    dragged,
  } = props;

  const triggerRef = useRef<TElement>(null);

  const hoverOptions =
    typeof events?.hover !== 'boolean' ? events?.hover : undefined;
  const focusOptions =
    typeof events?.focus !== 'boolean' ? events?.focus : undefined;

  const currentStateReplaced = baseState && mergeStrategy === 'replace';
  const { focusProps, isFocusVisible: focused } = useFocusRing(focusOptions);

  const [pressed, setPressed] = useState(false);
  const pressProps = useMemo<DOMAttributes | undefined>(
    () => ({
      onPointerDown: (event) => {
        if (!clickThrough) {
          event.stopPropagation();
        }

        setPressed(true);
      },
      onPointerUp: (event) => {
        if (!clickThrough) {
          event.stopPropagation();
        }

        setPressed(false);
      },
      onPointerLeave: () => {
        setPressed(false);
      },
      onKeyDown: (event) => {
        // When using a different element than an input, we want to allow the
        // Enter or Space key to trigger the click event for accessibility
        // purpose.
        const canSynthesizeClick =
          (event.target as HTMLElement).tagName !== 'INPUT' &&
          (event.key === 'Enter' || event.key === ' ') &&
          !event.repeat;
        if (canSynthesizeClick) {
          setPressed(true);
        }
      },
      onKeyUp: () => {
        setPressed(false);
      },
      onBlur: () => {
        setPressed(false);
      },
    }),
    [clickThrough],
  );

  const [hovered, setHovered] = useState(false);
  const handleHoverStart = useCallback(
    (event: React.PointerEvent) => {
      hoverOptions?.onHoverStart?.(event);
      setHovered(true);
    },
    [hoverOptions],
  );
  const handleHoverEnd = useCallback(
    (event: React.PointerEvent) => {
      hoverOptions?.onHoverEnd?.(event);
      setHovered(false);
    },
    [hoverOptions],
  );
  const hoverProps = useMemo<DOMAttributes | undefined>(
    () => ({
      onPointerEnter: (event) => {
        setHovered(true);

        if (!hoverOptions?.within) {
          activeTriggers[0]?.onHoverEnd(event);
          activeTriggers.unshift({
            target: event.target,
            onHoverStart: handleHoverStart,
            onHoverEnd: handleHoverEnd,
          });
        }
      },
      onPointerLeave: (event) => {
        setHovered(false);

        if (!hoverOptions?.within) {
          activeTriggers.shift();
          activeTriggers[0]?.onHoverStart(event);
        }
      },
    }),
    [hoverOptions, handleHoverStart, handleHoverEnd],
  );

  // Clear active triggers and manually call "hover end" events when the
  // component is disabled. This is to compensate for the fact that "hover end"
  // events are NOT being triggered when the component is disabled and the mouse
  // leaves the component, because pointer events are disabled.
  useEffect(() => {
    if (disabled) {
      activeTriggers.forEach(({ onHoverEnd }) => {
        onHoverEnd({} as React.PointerEvent);
      });
      activeTriggers.length = 0;
    }
  }, [disabled]);

  const triggerProps = useMemo<DOMAttributes | undefined>(
    () =>
      disabled
        ? {
            onPointerLeave: hoverProps?.onPointerLeave,
            onBlur: focusProps.onBlur,
          }
        : mergeProps(
            events?.press ? pressProps : undefined,
            events?.hover ? hoverProps : undefined,
            events?.focus
              ? {
                  ...focusProps,
                  tabIndex: 0,
                }
              : undefined,
          ),
    [disabled, events, hoverProps, pressProps, focusProps],
  );

  const currentState: IInteractions = useMemo(
    () => ({
      pressed: events?.press ? pressed : undefined,
      dragged,
      focused: events?.focus ? focused : undefined,
      hovered: events?.hover ? hovered : undefined,
    }),
    [events, pressed, dragged, focused, hovered],
  );

  const state = useMemo<IInteractions>(
    () =>
      baseState
        ? currentStateReplaced
          ? baseState
          : mergeStrategy === 'accumulate'
            ? accumulate(currentState, baseState)
            : {
                ...currentState,
                ...baseState,
              }
        : currentState,
    [mergeStrategy, baseState, currentStateReplaced, currentState],
  );

  return {
    triggerProps,
    triggerRef,
    baseState,
    state,
  };
};
