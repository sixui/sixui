import { useRef } from 'react';

import type {
  IUseInteractionsProps,
  IUseInteractionsResult,
} from '~/hooks/useInteractions';
import { useInteractions } from '~/hooks/useInteractions';
import { useRippleEffect } from '~/hooks/useRippleEffect';
import { mergeProps } from '~/utils/mergeProps';

export type IUseStateLayerProps = IUseInteractionsProps & {
  withoutRippleEffect?: boolean;
};

export type IUseStateLayerResult<TElement extends HTMLElement = HTMLElement> = {
  triggerRef: React.RefObject<TElement | null>;
  interactionsContext: IUseInteractionsResult<TElement>;
  surfaceRef: React.RefObject<HTMLDivElement | null>;
  animating?: boolean;
  withoutRippleEffect?: boolean;
  disabled?: boolean;
};

export const useStateLayer = <TElement extends HTMLElement>(
  props: IUseStateLayerProps = {},
): IUseStateLayerResult<TElement> => {
  const {
    events,
    baseState,
    mergeStrategy,
    dragged,
    disabled,
    withoutRippleEffect,
    clickThrough,
  } = props;
  const surfaceRef = useRef<HTMLDivElement>(null);
  const isStaticState = baseState && mergeStrategy === 'replace';
  const interactionsContext = useInteractions<TElement>({
    events: {
      ...events,
      hover: events?.hover ?? true,
      focus: events?.focus ?? true,
      press: events?.press ?? true,
    },
    baseState,
    mergeStrategy,
    dragged,
    disabled,
    clickThrough,
  });

  const triggerRef = useRef<TElement>(null);
  const rippleEffect = useRippleEffect({
    triggerRef,
    surfaceRef,
    disabled: withoutRippleEffect || disabled || isStaticState,
    clickThrough,
  });

  const animating = rippleEffect.animating;

  return {
    triggerRef,
    interactionsContext: {
      ...interactionsContext,
      triggerProps: mergeProps(
        interactionsContext.triggerProps,
        rippleEffect.triggerProps,
      ),
    },
    surfaceRef,
    animating,
    withoutRippleEffect,
    disabled,
  };
};
