import { forwardRef, useMemo } from 'react';
import { asArray } from '@olivierpascal/helpers';
import { useMergeRefs } from '@floating-ui/react';

import type {
  IPolymorphicRef,
  IWithAsProp,
} from '@/helpers/react/polymorphicComponentTypes';
import type { IThemeComponents } from '@/components/utils/Theme';
import type {
  ICardStyleKey,
  ICardStyleVarKey,
  ICardVariant,
} from './Card.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { useVisualState } from '@/components/utils/VisualState';
import { Elevation } from '@/components/utils/Elevation';
import { FocusRing } from '@/components/utils/FocusRing';
import { StateLayer } from '@/components/utils/StateLayer';
import { CardContext, type ICardContextValue } from './CardContext';
import {
  CARD_DEFAULT_TAG,
  type ICardOwnProps,
  type ICardProps,
} from './CardProps';

// https://github.com/material-components/material-web/blob/main/labs/card/internal/card.ts

type ICardVariantMap = {
  [key in ICardVariant]: keyof Pick<
    IThemeComponents,
    'ElevatedCard' | 'FilledCard' | 'OutlinedCard'
  >;
};

const variantMap: ICardVariantMap = {
  elevated: 'ElevatedCard',
  filled: 'FilledCard',
  outlined: 'OutlinedCard',
};

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

  const { theme, variantTheme, settings } = useComponentTheme(
    'Card',
    variant ? variantMap[variant] : undefined,
  );
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(theme.styles, variantTheme?.styles, styles),
    [theme.styles, variantTheme?.styles, styles],
  );
  const sxf = useMemo(
    () =>
      stylePropsFactory<ICardStyleKey, ICardStyleVarKey>(
        stylesCombinator,
        visualState,
      ),
    [stylesCombinator, visualState],
  );

  const actionable = !disabled && (!!href || !!onClick);
  const dragged = visualState?.dragged;

  const hasOutline =
    !!theme.styles?.outline ||
    !!variantTheme?.styles?.outline ||
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
          'host',
          actionable && 'host$actionable',
          disabled && 'host$disabled',
          theme.vars,
          variantTheme?.vars,
          sx,
        )}
        sx={sx}
        ref={handleRef}
        href={actionable && !dragged ? href : undefined}
        onClick={actionable && !dragged ? onClick : undefined}
        role={actionable ? 'button' : undefined}
        tabIndex={disabled || !actionable ? -1 : 0}
        disabled={disabled}
        {...other}
      >
        <Elevation
          styles={[theme.elevationStyles, ...asArray(innerStyles?.elevation)]}
          disabled={disabled}
        />
        {actionable ? (
          <>
            <StateLayer
              styles={[
                theme.stateLayerStyles,
                ...asArray(innerStyles?.stateLayer),
              ]}
              for={forwardedRef}
              disabled={disabled}
              visualState={visualState}
            />
            <FocusRing
              styles={[
                theme.focusRingStyles,
                ...asArray(innerStyles?.focusRing),
              ]}
              for={forwardedRef}
              visualState={visualState}
            />
          </>
        ) : null}
        {hasOutline ? (
          <div
            {...sxf(
              'outline',
              actionable && 'outline$actionable',
              disabled && 'outline$disabled',
            )}
          />
        ) : null}
        <div {...sxf('background', disabled && 'background$disabled')} />
        {children}
      </Component>
    </CardContext.Provider>
  );
});
