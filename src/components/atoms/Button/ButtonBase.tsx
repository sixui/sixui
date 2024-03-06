import { forwardRef, useMemo } from 'react';
import { asArray } from '@olivierpascal/helpers';

import type { IZeroOrMore, ICompiledStyles } from '@/helpers/types';
import type {
  IPolymorphicComponentPropsWithRef,
  IPolymorphicRef,
  IWithAsProp,
} from '@/helpers/polymorphicComponentTypes';
import type { IContainerProps } from '@/components/utils/Container';
import type { IButtonStyleKey, IButtonStyleVarKey } from '../Button';
import { type IVisualState, useVisualState } from '@/hooks/useVisualState';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useForkRef } from '@/hooks/useForkRef';
import { useComponentTheme } from '@/hooks/useComponentTheme';
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

const DEFAULT_TAG = 'button';

export type IButtonBaseOwnProps = IContainerProps<IButtonStyleKey> & {
  innerStyles?: {
    stateLayer?: IZeroOrMore<ICompiledStyles<IStateLayerStyleKey>>;
    focusRing?: IZeroOrMore<ICompiledStyles<IFocusRingStyleKey>>;
    elevation?: IZeroOrMore<ICompiledStyles<IElevationStyleKey>>;
  };
  visualState?: IVisualState;
  withLeadingIcon?: boolean;
  withTrailingIcon?: boolean;
  children?: React.ReactNode;
  inwardFocusRing?: boolean;
  href?: string;
  disabled?: boolean;
  readOnly?: boolean;
};

export type IButtonBaseProps<TRoot extends React.ElementType> =
  IPolymorphicComponentPropsWithRef<TRoot, IButtonBaseOwnProps>;

type IButtonBase = <TRoot extends React.ElementType = typeof DEFAULT_TAG>(
  props: IButtonBaseProps<TRoot>,
) => React.ReactNode;

export const ButtonBase: IButtonBase = forwardRef(function ButtonBase<
  TRoot extends React.ElementType = typeof DEFAULT_TAG,
>(props: IButtonBaseProps<TRoot>, ref?: IPolymorphicRef<TRoot>) {
  const {
    styles,
    sx,
    as,
    innerStyles,
    visualState: visualStateProp,
    withLeadingIcon,
    withTrailingIcon,
    children,
    inwardFocusRing,
    disabled: disabledProp,
    readOnly,
    href,
    ...other
  } = props as IWithAsProp<IButtonBaseOwnProps>;

  const disabled = disabledProp || readOnly;
  const { visualState, ref: visualStateRef } = useVisualState(visualStateProp, {
    disabled,
  });
  const handleRef = useForkRef(ref, visualStateRef);

  const theme = useComponentTheme('ButtonBase');
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(theme.styles, styles),
    [theme.styles, styles],
  );
  const styleProps = useMemo(
    () =>
      stylePropsFactory<IButtonStyleKey, IButtonStyleVarKey>(
        stylesCombinator,
        visualState,
      ),
    [stylesCombinator, visualState],
  );

  const Component = as ?? (href ? 'a' : DEFAULT_TAG);
  const hasOutline =
    theme.styles?.outline ||
    asArray(styles).some((styles) => !!styles?.outline);

  return (
    <Component
      {...styleProps(
        [
          'host',
          disabled && 'host$disabled',
          withLeadingIcon && 'host$withLeadingIcon',
          withTrailingIcon && 'host$withTrailingIcon',
          sx,
        ],
        [theme.vars],
      )}
      ref={handleRef}
      href={href}
      role='button'
      tabIndex={disabled ? -1 : 0}
      disabled={disabled}
      {...other}
    >
      <span {...styleProps(['touchTarget'])} />

      <Elevation
        styles={[theme.elevationStyles, ...asArray(innerStyles?.elevation)]}
        disabled={disabled}
      />
      {hasOutline ? (
        <div {...styleProps(['outline', disabled && 'outline$disabled'])} />
      ) : null}
      <div {...styleProps(['background', disabled && 'background$disabled'])} />
      <FocusRing
        styles={[theme.focusRingStyles, ...asArray(innerStyles?.focusRing)]}
        for={ref}
        visualState={visualState}
        inward={inwardFocusRing}
      />
      <StateLayer
        styles={[theme.stateLayerStyles, ...asArray(innerStyles?.stateLayer)]}
        for={ref}
        disabled={disabled}
        visualState={visualState}
      />
      {children}
    </Component>
  );
});
