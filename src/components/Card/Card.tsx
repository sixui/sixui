import { forwardRef, useMemo } from 'react';
import { asArray } from '@olivierpascal/helpers';
import { useMergeRefs } from '@floating-ui/react';

import type {
  IPolymorphicRef,
  IWithAsProp,
} from '@/helpers/react/polymorphicComponentTypes';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { useVisualState } from '@/components/VisualState';
import { Elevation } from '@/components/Elevation';
import { FocusRing } from '@/components/FocusRing';
import { StateLayer } from '@/components/StateLayer';
import {
  type ICardOwnProps,
  type ICardProps,
  CARD_DEFAULT_TAG,
} from './Card.types';
import { CardContext, type ICardContextValue } from './CardContext';
import { cardVariantStyles } from './variants';
import {
  cardElevationStyles,
  cardFocusRingStyles,
  cardStateLayerStyles,
  cardStyles,
} from './Card.styles';
import { cardTheme } from './Card.stylex';

// https://github.com/material-components/material-web/blob/main/labs/card/internal/card.ts

type ICard = <TRoot extends React.ElementType = typeof CARD_DEFAULT_TAG>(
  props: ICardProps<TRoot>,
) => React.ReactNode;

export const Card: ICard = forwardRef(function Card<
  TRoot extends React.ElementType = typeof CARD_DEFAULT_TAG,
>(props: ICardProps<TRoot>, forwardedRef?: IPolymorphicRef<TRoot>) {
  const {
    as,
    styles,
    sx,
    innerStyles,
    visualState: visualStateProp,
    variant = 'filled',
    children,
    onClick,
    href,
    disabled,
    ...other
  } = props as IWithAsProp<ICardOwnProps>;

  const { visualState, setRef: setVisualStateRef } = useVisualState(
    visualStateProp,
    { disabled },
  );
  const handleRef = useMergeRefs([forwardedRef, setVisualStateRef]);

  const { overridenStyles, settings } = useComponentTheme('Card');
  const variantStyles = variant ? cardVariantStyles[variant] : undefined;

  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(cardStyles, variantStyles, styles),
    [variantStyles, styles],
  );
  const sxf = useMemo(
    () => stylePropsFactory(stylesCombinator, visualState),
    [stylesCombinator, visualState],
  );

  const actionable = !disabled && (!!href || !!onClick);
  const dragged = visualState?.dragged;

  const hasOutline =
    !!cardStyles.outline ||
    !!variantStyles?.outline ||
    asArray(styles).some((styles) => !!styles?.outline);

  const Component =
    as ?? (!dragged && href ? settings.linkAs : CARD_DEFAULT_TAG);

  const context: ICardContextValue = {
    actionable,
  };

  return (
    <CardContext.Provider value={context}>
      <Component
        {...sxf(
          cardTheme,
          'host',
          actionable && 'host$actionable',
          disabled && 'host$disabled',
          overridenStyles,
          sx,
        )}
        sx={sx}
        ref={handleRef}
        href={actionable && !dragged ? href : undefined}
        onClick={actionable && !dragged ? onClick : undefined}
        onKeyDown={(event: React.KeyboardEvent<HTMLElement>) => {
          // if Enter or Space, trigger onClick
          if (
            actionable &&
            !dragged &&
            (event.key === 'Enter' || event.key === ' ')
          ) {
            event.preventDefault();
            onClick?.();
          }
          // actionable && !dragged ? onClick : undefined;
        }}
        role={actionable ? 'button' : undefined}
        tabIndex={disabled || !actionable ? -1 : 0}
        disabled={disabled}
        {...other}
      >
        <Elevation
          styles={[cardElevationStyles, ...asArray(innerStyles?.elevation)]}
          disabled={disabled}
        />
        {actionable ? (
          <>
            <StateLayer
              styles={[
                cardStateLayerStyles,
                ...asArray(innerStyles?.stateLayer),
              ]}
              for={forwardedRef}
              disabled={disabled}
              visualState={visualState}
            />
            <FocusRing
              styles={[cardFocusRingStyles, ...asArray(innerStyles?.focusRing)]}
              for={forwardedRef}
              visualState={visualState}
            />
          </>
        ) : null}
        {hasOutline ? <div {...sxf('outline')} /> : null}
        <div {...sxf('background', disabled && 'background$disabled')} />
        {children}
      </Component>
    </CardContext.Provider>
  );
});
