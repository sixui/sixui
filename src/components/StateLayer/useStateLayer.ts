import { useRef } from 'react';

import { useRipple } from '~/hooks/useRipple';
import {
  useInteractions,
  type IUseInteractionsResult,
  type IInteractions,
} from '~/hooks/useInteractions';
import {
  mergeProps,
  type HoverEvents,
  type PressEvent,
  type PressEvents,
} from 'react-aria';

export type IUseStateLayerProps = {
  disabled?: boolean;
  interactions?: IInteractions;
  focusWithin?: boolean;
  hoverEvents?: HoverEvents;
  pressEvents?: PressEvents;
};

export type IUseStateLayerResult<TElement extends HTMLElement = HTMLElement> = {
  triggerRef: React.RefObject<TElement>;
  interactionsContext: IUseInteractionsResult<TElement>;
  surfaceRef: React.RefObject<HTMLDivElement>;
  animating: boolean;
};

export const useStateLayer = <TElement extends HTMLElement>(
  props?: IUseStateLayerProps,
): IUseStateLayerResult<TElement> => {
  const { disabled, interactions, hoverEvents, pressEvents, focusWithin } =
    props ?? {};
  const surfaceRef = useRef<HTMLDivElement>(null);

  const handlePressStart = (event: PressEvent): void => onPressStart?.(event);
  const handlePressEnd = (event: PressEvent): void => onPressEnd?.(event);

  const interactionsContext = useInteractions<TElement>({
    events: {
      hover: hoverEvents ?? true,
      press:
        mergeProps(pressEvents, {
          onPressStart: handlePressStart,
          onPressEnd: handlePressEnd,
        }) ?? true,
      focus: {
        within: focusWithin,
      },
    },
    baseState: interactions,
    mergeStrategy: 'replace',
    disabled,
  });

  const triggerRef = useRef<TElement>(null);
  const {
    animating,
    onPressStart,
    onPressEnd,
    onPointerLeave,
    onPointerCancel,
    onContextMenu,
  } = useRipple({
    triggerRef,
    surfaceRef,
    disabled,
  });

  return {
    triggerRef,
    interactionsContext: {
      ...interactionsContext,
      triggerProps: mergeProps(interactionsContext.triggerProps, {
        onPointerLeave,
        onPointerCancel,
        onContextMenu,
      }),
    },
    surfaceRef,
    animating,
  };
};
