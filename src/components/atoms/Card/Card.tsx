import * as React from 'react';
import { accumulate, asArray } from '@olivierpascal/helpers';

import type {
  IZeroOrMore,
  ICompiledStyles,
  IAny,
  IMaybeAsync,
} from '@/helpers/types';
import type { IContainer } from '@/helpers/Container';
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
import { FocusRing, IFocusRingStyleKey } from '@/components/utils/FocusRing';
import { Ripple, type IRippleStyleKey } from '@/components/utils/Ripple';
import { CardContent } from '../CardContent';

export interface ICardProps
  extends IContainer<ICardStyleKey, ICardStyleVarKey>,
    Pick<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      'disabled' | 'aria-label' | 'aria-haspopup' | 'aria-expanded'
    >,
    Pick<React.LinkHTMLAttributes<HTMLLinkElement>, 'href'> {
  component?: React.ElementType;
  variant?: ICardVariant;
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement>) => IMaybeAsync<IAny>;
  rippleStyles?: IZeroOrMore<ICompiledStyles<IRippleStyleKey>>;
  focusRingStyles?: IZeroOrMore<ICompiledStyles<IFocusRingStyleKey>>;
  elevationStyles?: IZeroOrMore<ICompiledStyles<IElevationStyleKey>>;
}

export interface ICardSubComponents {
  Content: typeof CardContent;
}

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

// https://github.com/material-components/material-web/blob/main/labs/card/internal/card.ts
export const Card: React.FC<ICardProps> & ICardSubComponents = ({
  variant = 'filled',
  disabled,
  children,
  onClick,
  href,
  ...props
}) => {
  const theme = useComponentTheme('Card');
  const variantTheme = useComponentTheme(variantMap[variant]);

  const actionRef = React.useRef(null);
  const visualState = accumulate(useVisualState(actionRef), props.visualState);

  const styleProps = React.useMemo(
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

  const isInteractive = !disabled && (!!href || !!onClick);
  const Component: React.ElementType = props.component
    ? props.component
    : href
      ? 'a'
      : onClick
        ? 'button'
        : 'div';

  const hasOutline =
    theme.styles?.outline ||
    variantTheme.styles?.outline ||
    asArray(props.styles).some((styles) => !!styles?.outline);

  return (
    <Component
      {...styleProps(
        [
          'host',
          isInteractive && 'host$interactive',
          disabled && 'host$disabled',
          props.sx,
        ],
        [theme.vars, variantTheme.vars, props.theme],
      )}
      ref={actionRef}
      href={href}
      onClick={onClick}
      role={isInteractive ? 'button' : undefined}
      tabIndex={disabled || !isInteractive ? -1 : 0}
      aria-label={props['aria-label']}
      aria-haspopup={props['aria-haspopup']}
      aria-expanded={props['aria-expanded']}
    >
      <Elevation
        styles={[
          theme.elevationStyles,
          variantTheme.elevationStyles,
          ...asArray(props.elevationStyles),
        ]}
        disabled={disabled}
      />
      {hasOutline ? (
        <div
          {...styleProps([
            'outline',
            isInteractive && 'outline$interactive',
            disabled && 'outline$disabled',
          ])}
        />
      ) : null}
      <div {...styleProps(['background', disabled && 'background$disabled'])} />
      {isInteractive ? (
        <React.Fragment>
          <FocusRing
            styles={[
              theme.focusRingStyles,
              variantTheme.focusRingStyles,
              ...asArray(props.focusRingStyles),
            ]}
            for={actionRef}
            visualState={visualState}
          />
          <Ripple
            styles={[
              theme.rippleStyles,
              variantTheme.rippleStyles,
              ...asArray(props.rippleStyles),
            ]}
            for={actionRef}
            disabled={disabled}
            visualState={visualState}
          />
        </React.Fragment>
      ) : null}
      {children}
    </Component>
  );
};

Card.Content = CardContent;
