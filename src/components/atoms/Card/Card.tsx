import { forwardRef, useMemo } from 'react';
import { asArray } from '@olivierpascal/helpers';

import type {
  IContainerProps,
  IZeroOrMore,
  ICompiledStyles,
  IMaybeAsync,
  IAny,
} from '@/helpers/types';
import type {
  IPolymorphicComponentPropsWithRef,
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
import { type IVisualState, useVisualState } from '@/hooks/useVisualState';
import { Elevation, IElevationStyleKey } from '@/components/utils/Elevation';
import {
  FocusRing,
  type IFocusRingStyleKey,
} from '@/components/utils/FocusRing';
import {
  StateLayer,
  type IStateLayerStyleKey,
} from '@/components/utils/StateLayer';
import { useForkRef } from '@/hooks/useForkRef';
import { CardContext, type ICardContext } from './CardContext';
import { CardHeader } from '../CardHeader';
import { CardMedia } from '../CardMedia';
import { CardContent } from '../CardContent';
import { CardTitle } from '../CardTitle';
import { CardActions } from '../CardActions';

// https://github.com/material-components/material-web/blob/main/labs/card/internal/card.ts

const DEFAULT_TAG = 'div';

export type ICardOwnProps = IContainerProps<ICardStyleKey> & {
  innerStyles?: {
    elevation?: IZeroOrMore<ICompiledStyles<IElevationStyleKey>>;
    stateLayer?: IZeroOrMore<ICompiledStyles<IStateLayerStyleKey>>;
    focusRing?: IZeroOrMore<ICompiledStyles<IFocusRingStyleKey>>;
  };
  visualState?: IVisualState;
  variant?: ICardVariant | false;
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement>) => IMaybeAsync<IAny>;
  href?: string;
  disabled?: boolean;
};

export type ICardProps<TRoot extends React.ElementType = typeof DEFAULT_TAG> =
  IPolymorphicComponentPropsWithRef<TRoot, ICardOwnProps>;

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

type ICard = <TRoot extends React.ElementType = typeof DEFAULT_TAG>(
  props: ICardProps<TRoot>,
) => React.ReactNode;

const Card: ICard = forwardRef(function Card<
  TRoot extends React.ElementType = typeof DEFAULT_TAG,
>(props: ICardProps<TRoot>, ref?: IPolymorphicRef<TRoot>) {
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

  const { visualState, ref: visualStateRef } = useVisualState(visualStateProp, {
    disabled,
  });
  const handleRef = useForkRef(ref, visualStateRef);

  const { theme, variantTheme } = useComponentTheme(
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

  const Component = as ?? (!dragged && href ? 'a' : DEFAULT_TAG);

  const context: ICardContext = {
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
              for={ref}
              disabled={disabled}
              visualState={visualState}
            />
            <FocusRing
              styles={[
                theme.focusRingStyles,
                ...asArray(innerStyles?.focusRing),
              ]}
              for={ref}
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

const CardNamespace = Object.assign(Card, {
  Header: CardHeader,
  Media: CardMedia,
  Content: CardContent,
  Title: CardTitle,
  Actions: CardActions,
});

export { CardNamespace as Card };
