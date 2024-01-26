import React from 'react';
import { accumulate } from '@olivierpascal/helpers';

import type { IAny, IMaybeAsync } from '@/helpers/types';
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
import { Elevation } from '@/components/utils/Elevation';
import { FocusRing } from '@/components/utils/FocusRing';
import { Ripple } from '@/components/utils/Ripple';

export interface ICardProps
  extends IContainer<ICardStyleKey, ICardStyleVarKey>,
    Pick<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      'disabled' | 'aria-label' | 'aria-haspopup' | 'aria-expanded'
    >,
    Pick<React.LinkHTMLAttributes<HTMLLinkElement>, 'href'> {
  variant?: ICardVariant;
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement>) => IMaybeAsync<IAny>;
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
export const Card: React.FC<ICardProps> = ({
  variant = 'filled',
  disabled,
  children,
  onClick,
  href,
  ...props
}) => {
  const { theme, styles, rippleStyles, elevationStyles, focusRingStyles } =
    useComponentTheme('Card');
  const { theme: variantTheme, styles: variantStyles } = useComponentTheme(
    variantMap[variant],
  );

  const actionElRef = React.useRef(null);
  const visualState = accumulate(
    useVisualState(actionElRef),
    props.visualState,
  );

  const styleProps = React.useMemo(
    () =>
      stylePropsFactory<ICardStyleKey, ICardStyleVarKey>(
        stylesCombinatorFactory(styles, variantStyles, props.styles),
        visualState,
      ),
    [styles, variantStyles, props.styles, visualState],
  );

  const isInteractive = !disabled && (!!href || !!onClick);
  const Component: React.ElementType = href ? 'a' : onClick ? 'button' : 'div';

  return (
    <Component
      {...styleProps(
        [
          'host',
          isInteractive && 'host$interactive',
          disabled && 'host$disabled',
        ],
        [theme, variantTheme, props.theme],
      )}
      ref={actionElRef}
      href={href}
      onClick={onClick}
      role={isInteractive ? 'button' : undefined}
      tabIndex={disabled || !isInteractive ? -1 : 0}
      aria-label={props['aria-label']}
      aria-haspopup={props['aria-haspopup']}
      aria-expanded={props['aria-expanded']}
    >
      <Elevation styles={elevationStyles} disabled={disabled} />
      {variantStyles?.outline ? (
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
            styles={focusRingStyles}
            for={actionElRef}
            visualState={visualState}
          />
          <Ripple
            styles={rippleStyles}
            for={actionElRef}
            disabled={disabled}
            visualState={visualState}
          />
        </React.Fragment>
      ) : null}
      <div {...styleProps(['content'])}>{children}</div>
    </Component>
  );
};
