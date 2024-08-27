import type { DOMAttributes } from '@react-types/shared';
import { useEffect, useRef } from 'react';

import { useRipple } from '~/hooks/useRipple';
import {
  useInteractions,
  type IInteractionState,
} from '~/hooks/useInteractions';

export type IUseStateLayerProps = {
  disabled?: boolean;
  interactionState?: IInteractionState;
};

export type IStateLayerContext<TElement extends HTMLElement = HTMLElement> = {
  targetProps: DOMAttributes;
  state: IInteractionState;
  interactiveTargetRef: React.RefObject<TElement>;
  surfaceRef: React.RefObject<HTMLDivElement>;
  animating: boolean;
};

export const useStateLayer = <TElement extends HTMLElement>(
  props?: IUseStateLayerProps,
): IStateLayerContext<TElement> => {
  const { disabled, interactionState } = props ?? {};
  const surfaceRef = useRef<HTMLDivElement>(null);
  const interactiveTargetRef = useRef<TElement>(null);
  const {
    animating,
    onPressStart,
    onPressEnd,
    onPress,
    onPointerLeave,
    onPointerCancel,
    onContextMenu,
  } = useRipple({
    interactiveTargetRef,
    surfaceRef,
    disabled,
  });

  const interactions = useInteractions({
    staticState: interactionState,
    pressEvents: {
      onPressStart,
      onPressEnd,
      onPress,
    },
    disabled,
  });

  useEffect(() => {
    const control = interactiveTargetRef.current;
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
  }, [interactiveTargetRef, onPointerLeave, onPointerCancel, onContextMenu]);

  return {
    targetProps: interactions.targetProps,
    state: interactions.state,
    interactiveTargetRef,
    surfaceRef,
    animating,
  };
};
