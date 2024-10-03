import type { HoverEvents, PressEvents } from 'react-aria';
import { useRef } from 'react';
import { mergeProps } from 'react-aria';

import type {
  IInteractions,
  IUseInteractionsResult,
} from '~/hooks/useInteractions';
import { useInteractions } from '~/hooks/useInteractions';
import { useRipple } from '~/hooks/useRipple';

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
  const { disabled, interactions, hoverEvents, focusWithin } = props ?? {};
  const surfaceRef = useRef<HTMLDivElement>(null);

  const interactionsContext = useInteractions<TElement>({
    events: {
      hover: hoverEvents ?? true,
      focus: {
        within: focusWithin,
      },
    },
    baseState: interactions,
    disabled,
  });

  const triggerRef = useRef<TElement>(null);
  const {
    animating,
    onPointerDown,
    onPointerUp,
    onPointerLeave,
    onPointerCancel,
    onClick,
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
        onPointerDown,
        onPointerUp,
        onPointerLeave,
        onPointerCancel,
        onClick,
        onContextMenu,
      }),
    },
    surfaceRef,
    animating,
  };
};
