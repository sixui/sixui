import React from 'react';
import { accumulate, asArray } from '@olivierpascal/helpers';

import type {
  IZeroOrMore,
  ICompiledStyles,
  IAny,
  IMaybeAsync,
} from '@/helpers/types';
import type { IContainer } from '@/helpers/Container';
import type { IButtonStyleKey, IButtonStyleVarKey } from '../Button';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { useVisualState } from '@/hooks/useVisualState';
import {
  Elevation,
  type IElevationStyleKey,
} from '@/components/utils/Elevation';
import {
  FocusRing,
  type IFocusRingStyleKey,
} from '@/components/utils/FocusRing';
import { Ripple, type IRippleStyleKey } from '@/components/utils/Ripple';

export interface IButtonBaseProps
  extends IContainer<IButtonStyleKey, IButtonStyleVarKey>,
    Pick<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      'type' | 'disabled' | 'aria-label' | 'aria-haspopup' | 'aria-expanded'
    >,
    Pick<React.LinkHTMLAttributes<HTMLLinkElement>, 'href'> {
  withLeadingIcon?: boolean;
  withTrailingIcon?: boolean;
  rippleStyles?: IZeroOrMore<ICompiledStyles<IRippleStyleKey>>;
  focusRingStyles?: IZeroOrMore<ICompiledStyles<IFocusRingStyleKey>>;
  elevationStyles?: IZeroOrMore<ICompiledStyles<IElevationStyleKey>>;
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement>) => IMaybeAsync<IAny>;
}

export const ButtonBase: React.FC<IButtonBaseProps> = ({
  withLeadingIcon,
  withTrailingIcon,
  type,
  disabled,
  href,
  onClick,
  children,
  ...props
}) => {
  const theme = useComponentTheme('ButtonBase');

  const actionRef = React.useRef(null);
  const visualState = accumulate(useVisualState(actionRef), props.visualState);

  const styleProps = React.useMemo(
    () =>
      stylePropsFactory<IButtonStyleKey, IButtonStyleVarKey>(
        stylesCombinatorFactory(theme.styles, props.styles),
        visualState,
      ),
    [theme.styles, props.styles, visualState],
  );

  const Component: React.ElementType = href ? 'a' : 'button';
  const hasOutline =
    theme.styles?.outline ||
    asArray(props.styles).some((styles) => !!styles?.outline);

  return (
    <Component
      {...styleProps(
        [
          'host',
          disabled && 'host$disabled',
          withLeadingIcon && 'host$withLeadingIcon',
          withTrailingIcon && 'host$withTrailingIcon',
        ],
        [theme.vars, props.theme],
      )}
      ref={actionRef}
      href={href}
      onClick={onClick}
      role='button'
      tabIndex={disabled ? -1 : 0}
      aria-label={props['aria-label']}
      aria-haspopup={props['aria-haspopup']}
      aria-expanded={props['aria-expanded']}
      type={type}
    >
      <span {...styleProps(['touchTarget'])} />

      <Elevation
        styles={[theme.elevationStyles, ...asArray(props.elevationStyles)]}
        disabled={disabled}
      />
      {hasOutline ? (
        <div {...styleProps(['outline', disabled && 'outline$disabled'])} />
      ) : null}
      <div {...styleProps(['background', disabled && 'background$disabled'])} />
      <FocusRing
        styles={[theme.focusRingStyles, ...asArray(props.focusRingStyles)]}
        for={actionRef}
        visualState={visualState}
      />
      <Ripple
        styles={[theme.rippleStyles, ...asArray(props.rippleStyles)]}
        for={actionRef}
        disabled={disabled}
        visualState={visualState}
      />

      {children}
    </Component>
  );
};
