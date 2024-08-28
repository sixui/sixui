import type { DOMAttributes } from '@react-types/shared';
import { useEffect, useRef } from 'react';

import { useRipple } from '~/hooks/useRipple';
import {
  useInteractions,
  type IInteractionState,
} from '~/hooks/useInteractions';

export type IUseStateLayerProps = {
  disabled?: boolean;
  staticInteractionState?: IInteractionState;
};

export type IStateLayerContext<TElement extends HTMLElement = HTMLElement> = {
  interactiveTargetProps: DOMAttributes;
  state: IInteractionState;
  staticState?: IInteractionState;
  interactiveTargetRef: React.RefObject<TElement>;
  surfaceRef: React.RefObject<HTMLDivElement>;
  animating: boolean;
};

export const useStateLayer = <TElement extends HTMLElement>(
  props?: IUseStateLayerProps,
): IStateLayerContext<TElement> => {
  const { disabled, staticInteractionState } = props ?? {};
  const surfaceRef = useRef<HTMLDivElement>(null);
  const interactiveTargetRef = useRef<TElement>(null);
  const {
    animating,
    onPressStart,
    onPressEnd,
    onPointerLeave,
    onPointerCancel,
    onContextMenu,
  } = useRipple({
    interactiveTargetRef,
    surfaceRef,
    disabled,
  });

  const interactions = useInteractions({
    staticState: staticInteractionState,
    pressEvents: {
      onPressStart,
      onPressEnd,
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
    interactiveTargetProps: interactions.targetProps,
    staticState: interactions.staticState,
    state: interactions.state,
    interactiveTargetRef,
    surfaceRef,
    animating,
  };
};
