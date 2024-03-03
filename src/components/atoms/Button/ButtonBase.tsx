import { useMemo, useRef } from 'react';
import { accumulate, asArray } from '@olivierpascal/helpers';

import type {
  IZeroOrMore,
  ICompiledStyles,
  IAny,
  IMaybeAsync,
} from '@/helpers/types';
import type { IContainerProps } from '@/components/utils/Container';
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
import {
  StateLayer,
  type IStateLayerStyleKey,
} from '@/components/utils/StateLayer';

export type IButtonBaseProps = IContainerProps<
  IButtonStyleKey,
  IButtonStyleVarKey
> &
  Pick<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    'type' | 'disabled' | 'aria-label' | 'aria-haspopup' | 'aria-expanded'
  > &
  Pick<React.LinkHTMLAttributes<HTMLLinkElement>, 'href'> & {
    component?: React.ElementType;
    withLeadingIcon?: boolean;
    withTrailingIcon?: boolean;
    statelayerStyles?: IZeroOrMore<ICompiledStyles<IStateLayerStyleKey>>;
    focusRingStyles?: IZeroOrMore<ICompiledStyles<IFocusRingStyleKey>>;
    elevationStyles?: IZeroOrMore<ICompiledStyles<IElevationStyleKey>>;
    children?: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLElement>) => IMaybeAsync<IAny>;
    inwardFocusRing?: boolean;
  };

export const ButtonBase: React.FC<IButtonBaseProps> = ({
  withLeadingIcon,
  withTrailingIcon,
  type,
  disabled,
  href,
  onClick,
  children,
  inwardFocusRing,
  ...props
}) => {
  const theme = useComponentTheme('ButtonBase');

  const actionRef = useRef(null);
  const visualState = accumulate(useVisualState(actionRef), props.visualState);

  const styleProps = useMemo(
    () =>
      stylePropsFactory<IButtonStyleKey, IButtonStyleVarKey>(
        stylesCombinatorFactory(theme.styles, props.styles),
        visualState,
      ),
    [theme.styles, props.styles, visualState],
  );

  const Component: React.ElementType = props.component
    ? props.component
    : href
      ? 'a'
      : 'button';
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
          props.sx,
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
        inward={inwardFocusRing}
      />
      <StateLayer
        styles={[theme.statelayerStyles, ...asArray(props.statelayerStyles)]}
        for={actionRef}
        disabled={disabled}
        visualState={visualState}
      />

      {children}
    </Component>
  );
};
