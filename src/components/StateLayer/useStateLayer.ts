import { useRef } from 'react';

import { useRipple } from '~/hooks/useRipple';
import {
  useInteractions,
  type IUseInteractionsResult,
  type IInteractions,
  type IUseInteractionsProps,
} from '~/hooks/useInteractions';
import { mergeProps, PressEvent } from 'react-aria';

export type IUseStateLayerProps = Pick<
  IUseInteractionsProps,
  'hoverEvents' | 'pressEvents'
> & {
  disabled?: boolean;
  interactions?: IInteractions;
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
  const { disabled, interactions, hoverEvents, pressEvents } = props ?? {};
  const surfaceRef = useRef<HTMLDivElement>(null);

  const handlePressStart = (event: PressEvent): void => onPressStart?.(event);
  const handlePressEnd = (event: PressEvent): void => onPressEnd?.(event);

  const interactionsContext = useInteractions<TElement>({
    baseState: interactions,
    hoverEvents,
    pressEvents: mergeProps(pressEvents, {
      onPressStart: handlePressStart,
      onPressEnd: handlePressEnd,
    }),
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
