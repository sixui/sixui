import { useEffect, useRef } from 'react';

import { useRipple } from '~/hooks/useRipple';
import {
  useInteractions,
  type IInteractions,
  type IInteractionState,
} from '~/hooks/useInteractions';
import { PressEvent } from 'react-aria';

export type IUseStateLayerProps = {
  disabled?: boolean;
  staticInteractionState?: IInteractionState;
};

export type IStateLayerContext<TElement extends HTMLElement = HTMLElement> = {
  interactions: IInteractions<TElement>;
  surfaceRef: React.RefObject<HTMLDivElement>;
  animating: boolean;
};

export const useStateLayer = <TElement extends HTMLElement>(
  props?: IUseStateLayerProps,
): IStateLayerContext<TElement> => {
  const { disabled, staticInteractionState } = props ?? {};
  const surfaceRef = useRef<HTMLDivElement>(null);

  const handlePressStart = (event: PressEvent): void => onPressStart?.(event);
  const handlePressEnd = (event: PressEvent): void => onPressEnd?.(event);

  const interactions = useInteractions<TElement>({
    staticState: staticInteractionState,
    pressEvents: {
      onPressStart: handlePressStart,
      onPressEnd: handlePressEnd,
    },
    disabled,
  });

  const {
    animating,
    onPressStart,
    onPressEnd,
    onPointerLeave,
    onPointerCancel,
    onContextMenu,
  } = useRipple({
    interactiveTargetRef: interactions.targetRef,
    surfaceRef,
    disabled,
  });

  useEffect(() => {
    const control = interactions.targetRef.current;
    if (!control) {
      return;
    }

    control.addEventListener('pointerleave', onPointerLeave);
    control.addEventListener('pointercancel', onPointerCancel);
    control.addEventListener('contextmenu', onContextMenu);

    return () => {
      control.removeEventListener('pointerleave', onPointerLeave);
      control.removeEventListener('pointercancel', onPointerCancel);
      control.removeEventListener('contextmenu', onContextMenu);
    };
  }, [interactions.targetRef, onPointerLeave, onPointerCancel, onContextMenu]);

  return {
    interactions,
    surfaceRef,
    animating,
  };
};
