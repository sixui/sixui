import { forwardRef, useMemo, useRef } from 'react';
import { asArray } from '@olivierpascal/helpers';

import type {
  IPolymorphicComponentPropsWithRef,
  IPolymorphicRef,
} from '@/helpers/polymorphicComponentTypes';
import type {
  IZeroOrMore,
  ICompiledStyles,
  IMaybeAsync,
  IAny,
} from '@/helpers/types';
import type { IContainerProps } from '@/components/utils/Container';
import type { IThemeComponents } from '@/helpers/ThemeContext';
import type {
  ICardStyleKey,
  ICardStyleVarKey,
  ICardVariant,
} from './Card.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { useVisualState } from '@/hooks/useVisualState';
import { Elevation, IElevationStyleKey } from '@/components/utils/Elevation';
import {
  FocusRing,
  type IFocusRingStyleKey,
} from '@/components/utils/FocusRing';
import {
  StateLayer,
  type IStateLayerStyleKey,
} from '@/components/utils/StateLayer';
import { CardContext, type ICardContext } from './CardContext';
import { CardHeader } from '../CardHeader';
import { CardMedia } from '../CardMedia';
import { CardContent } from '../CardContent';
import { CardTitle } from '../CardTitle';
import { CardActions } from '../CardActions';
import { useForkRef } from '@/hooks/useForkRef';

// https://github.com/material-components/material-web/blob/main/labs/card/internal/card.ts

export type ICardProps<TRoot extends React.ElementType = 'div'> =
  IPolymorphicComponentPropsWithRef<
    TRoot,
    IContainerProps<ICardStyleKey, ICardStyleVarKey> & {
      variant?: ICardVariant;
      children: React.ReactNode;
      elevationStyles?: IZeroOrMore<ICompiledStyles<IElevationStyleKey>>;
      statelayerStyles?: IZeroOrMore<ICompiledStyles<IStateLayerStyleKey>>;
      focusRingStyles?: IZeroOrMore<ICompiledStyles<IFocusRingStyleKey>>;
      onClick?: (event: React.MouseEvent<HTMLElement>) => IMaybeAsync<IAny>;
      href?: string;
      disabled?: boolean;
      'aria-label'?: string;
      'aria-haspopup'?: boolean;
      'aria-expanded'?: boolean;
      onKeyDown?: (
        event: React.KeyboardEvent<HTMLElement>,
      ) => IMaybeAsync<IAny>;
      onPointerDown?: (
        event: React.PointerEvent<HTMLElement>,
      ) => IMaybeAsync<IAny>;
    }
  >;

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

type ICard = <TRoot extends React.ElementType = 'div'>(
  props: ICardProps<TRoot>,
) => React.ReactNode | null;

const Card: ICard = forwardRef(function Card<
  TRoot extends React.ElementType = 'div',
>(
  {
    variant = 'filled',
    children,
    onClick,
    href,
    as,
    ...props
  }: ICardProps<TRoot>,
  ref?: IPolymorphicRef<TRoot>,
) {
  const buttonRef = useRef(null);

  const theme = useComponentTheme('Card');
  const variantTheme = useComponentTheme(variantMap[variant]);
  const { visualState, ref: visualStateRef } = useVisualState(
    props.visualState,
  );

  const styleProps = useMemo(
    () =>
      stylePropsFactory<ICardStyleKey, ICardStyleVarKey>(
        stylesCombinatorFactory(
          theme.styles,
          variantTheme.styles,
          props.styles,
        ),
        visualState,
      ),
    [theme.styles, variantTheme.styles, props.styles, visualState],
  );

  const disabled = props.disabled;
  const actionable = !disabled && (!!href || !!onClick);
  const dragged = visualState?.dragged;

  const hasOutline =
    !!theme.styles?.outline ||
    !!variantTheme.styles?.outline ||
    asArray(props.styles).some((styles) => !!styles?.outline);

  // If not using `as ? as : ...`, the inferred type is not correct.
  const Component = as ? as : !dragged && href ? 'a' : 'div';

  const handleRef = useForkRef(ref, buttonRef, visualStateRef);

  const context: ICardContext = {
    actionable,
  };

  return (
    <CardContext.Provider value={context}>
      <Component
        {...styleProps(
          [
            'host',
            actionable && 'host$actionable',
            disabled && 'host$disabled',
            props.sx,
          ],
          [theme.vars, variantTheme.vars, props.theme],
        )}
        ref={handleRef}
        href={actionable && !dragged ? href : undefined}
        onClick={actionable && !dragged ? onClick : undefined}
        role={actionable ? 'button' : undefined}
        tabIndex={disabled || !actionable ? -1 : 0}
        aria-label={props['aria-label']}
        aria-haspopup={props['aria-haspopup']}
        aria-expanded={props['aria-expanded']}
      >
        <Elevation
          styles={[theme.elevationStyles, ...asArray(props.elevationStyles)]}
          disabled={disabled}
        />
        {actionable ? (
          <>
            <StateLayer
              styles={[
                theme.statelayerStyles,
                ...asArray(props.statelayerStyles),
              ]}
              for={buttonRef}
              disabled={disabled}
              visualState={visualState}
            />
            <FocusRing
              styles={[
                theme.focusRingStyles,
                ...asArray(props.focusRingStyles),
              ]}
              for={buttonRef}
              visualState={visualState}
            />
          </>
        ) : null}
        {hasOutline ? (
          <div
            {...styleProps([
              'outline',
              actionable && 'outline$actionable',
              disabled && 'outline$disabled',
            ])}
          />
        ) : null}
        <div
          {...styleProps(['background', disabled && 'background$disabled'])}
        />
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
