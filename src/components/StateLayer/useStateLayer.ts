import { useRef } from 'react';
import { mergeProps } from 'react-aria';

import type {
  IUseInteractionsProps,
  IUseInteractionsResult,
} from '~/hooks/useInteractions';
import { useInteractions } from '~/hooks/useInteractions';
import { useRipple } from '~/hooks/useRipple';

export type IUseStateLayerProps = IUseInteractionsProps & {
  withoutRippleEffect?: boolean;
};

export type IUseStateLayerResult<TElement extends HTMLElement = HTMLElement> = {
  triggerRef: React.RefObject<TElement>;
  interactionsContext: IUseInteractionsResult<TElement>;
  surfaceRef: React.RefObject<HTMLDivElement>;
  animating?: boolean;
  withoutRippleEffect?: boolean;
};

export const useStateLayer = <TElement extends HTMLElement>(
  props: IUseStateLayerProps = {},
): IUseStateLayerResult<TElement> => {
  const {
    events,
    baseState,
    mergeStrategy = 'replace',
    dragged,
    disabled,
    withoutRippleEffect,
  } = props;
  const surfaceRef = useRef<HTMLDivElement>(null);
  const isStaticState = baseState && mergeStrategy === 'replace';
  const interactionsContext = useInteractions<TElement>({
    events: {
      ...events,
      hover: events?.hover ?? true,
      focus: events?.focus ?? true,
      press:
        events?.press ?? (withoutRippleEffect && !disabled && !isStaticState),
    },
    baseState,
    mergeStrategy,
    dragged,
    disabled,
  });

  const triggerRef = useRef<TElement>(null);
  const ripple = useRipple({
    triggerRef,
    surfaceRef,
    disabled: withoutRippleEffect || disabled || isStaticState,
  });

  return {
    triggerRef,
    interactionsContext: {
      ...interactionsContext,
      triggerProps: mergeProps(
        interactionsContext.triggerProps,
        ripple.triggerProps,
      ),
    },
    surfaceRef,
    animating: ripple.animating,
    withoutRippleEffect,
  };
};
