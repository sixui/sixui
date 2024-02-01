import React from 'react';
import { accumulate, asArray, filterUndefineds } from '@olivierpascal/helpers';

import type { ICompiledStyles, IAny, IMaybeAsync } from '@/helpers/types';
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
  rippleStyles?: ICompiledStyles<IRippleStyleKey>;
  focusRingStyles?: ICompiledStyles<IFocusRingStyleKey>;
  elevationStyles?: ICompiledStyles<IElevationStyleKey>;
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement>) => IMaybeAsync<IAny>;
}

export const ButtonBase: React.FC<IButtonBaseProps> = ({
  type,
  disabled,
  href,
  onClick,
  children,
  ...props
}) => {
  const { theme, styles, rippleStyles, focusRingStyles, elevationStyles } =
    useComponentTheme('Button');

  const actionElRef = React.useRef(null);
  const visualState = accumulate(
    useVisualState(actionElRef),
    props.visualState,
  );

  const styleProps = React.useMemo(
    () =>
      stylePropsFactory<IButtonStyleKey, IButtonStyleVarKey>(
        stylesCombinatorFactory(styles, props.styles),
        visualState,
      ),
    [styles, props.styles, visualState],
  );

  const Component: React.ElementType = href ? 'a' : 'button';
  const hasOutline =
    styles?.outline ||
    filterUndefineds(asArray(props.styles)).some((styles) => !!styles?.outline);

  return (
    <div
      {...styleProps(
        ['host', disabled && 'host$disabled'],
        [theme, props.theme],
      )}
    >
      <Elevation
        styles={[elevationStyles, props.elevationStyles]}
        disabled={disabled}
      />
      {hasOutline ? (
        <div {...styleProps(['outline', disabled && 'outline$disabled'])} />
      ) : null}
      <div {...styleProps(['background', disabled && 'background$disabled'])} />
      <FocusRing
        styles={[focusRingStyles, props.focusRingStyles]}
        for={actionElRef}
        visualState={visualState}
      />
      <Ripple
        styles={[rippleStyles, props.rippleStyles]}
        for={actionElRef}
        disabled={disabled}
        visualState={visualState}
      />

      <Component
        {...styleProps(['button'])}
        ref={actionElRef}
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

        {children}
      </Component>
    </div>
  );
};
