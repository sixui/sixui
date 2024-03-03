import { forwardRef, Fragment, useMemo } from 'react';
import { accumulate, asArray } from '@olivierpascal/helpers';

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
import { useForwardedRef } from '@/hooks/useForwardedRef';

// https://github.com/material-components/material-web/blob/main/labs/card/internal/card.ts

export type ICardProps = IContainerProps<ICardStyleKey, ICardStyleVarKey> & {
  variant?: ICardVariant;
  children: React.ReactNode;
  elevationStyles?: IZeroOrMore<ICompiledStyles<IElevationStyleKey>>;
  statelayerStyles?: IZeroOrMore<ICompiledStyles<IStateLayerStyleKey>>;
  focusRingStyles?: IZeroOrMore<ICompiledStyles<IFocusRingStyleKey>>;
  component?: React.ElementType;
  onClick?: (event: React.MouseEvent<HTMLElement>) => IMaybeAsync<IAny>;
  href?: string;
  disabled?: boolean;
  'aria-label'?: string;
  'aria-haspopup'?: boolean;
  'aria-expanded'?: boolean;
};

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

const Card: React.ForwardRefExoticComponent<ICardProps> = forwardRef(
  function Card(
    { variant = 'filled', children, onClick, href, ...props },
    forwardedRef: React.ForwardedRef<HTMLElement>,
  ): React.ReactNode {
    const hostRef = useForwardedRef(forwardedRef);

    const theme = useComponentTheme('Card');
    const variantTheme = useComponentTheme(variantMap[variant]);

    const visualState = accumulate(useVisualState(hostRef), props.visualState);

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

    const hasOutline =
      !!theme.styles?.outline ||
      !!variantTheme.styles?.outline ||
      asArray(props.styles).some((styles) => !!styles?.outline);

    const Component = props.component ? props.component : href ? 'a' : 'div';

    const context: ICardContext = {
      actionable,
    };

    const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
      if (visualState?.dragged) {
        event.preventDefault();

        return;
      }

      onClick?.(event);
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
          ref={forwardedRef}
          href={actionable ? href : undefined}
          onClick={actionable ? handleClick : undefined}
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
            <Fragment>
              <StateLayer
                styles={[
                  theme.statelayerStyles,
                  ...asArray(props.statelayerStyles),
                ]}
                for={hostRef}
                disabled={disabled}
                visualState={visualState}
              />
              <FocusRing
                styles={[
                  theme.focusRingStyles,
                  ...asArray(props.focusRingStyles),
                ]}
                for={hostRef}
                visualState={visualState}
              />
            </Fragment>
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
  },
);

const CardNamespace = Object.assign(Card, {
  Header: CardHeader,
  Media: CardMedia,
  Content: CardContent,
  Title: CardTitle,
  Actions: CardActions,
});

export { CardNamespace as Card };
