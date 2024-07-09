import { forwardRef, useMemo } from 'react';
import { asArray } from '@olivierpascal/helpers';
import { useMergeRefs } from '@floating-ui/react';

import type {
  IPolymorphicRef,
  IWithAsProp,
} from '@/helpers/react/polymorphicComponentTypes';
import type { IButtonBaseStyleKey } from './ButtonBase.styledefs';
import { useVisualState } from '@/components/utils/VisualState';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { Elevation } from '@/components/utils/Elevation';
import { FocusRing } from '@/components/utils/FocusRing';
import { StateLayer } from '@/components/utils/StateLayer';
import {
  BUTTON_BASE_DEFAULT_TAG,
  type IButtonBaseProps,
  type IButtonBaseOwnProps,
} from './ButtonBaseProps';

type IButtonBase = <
  TRoot extends React.ElementType = typeof BUTTON_BASE_DEFAULT_TAG,
>(
  props: IButtonBaseProps<TRoot>,
) => React.ReactNode;

export const ButtonBase: IButtonBase = forwardRef(function ButtonBase<
  TRoot extends React.ElementType = typeof BUTTON_BASE_DEFAULT_TAG,
>(props: IButtonBaseProps<TRoot>, forwardedRef?: IPolymorphicRef<TRoot>) {
  const {
    as,
    styles,
    sx,
    innerStyles,
    visualState: visualStateProp,
    withLeadingIcon,
    withTrailingIcon,
    children,
    inwardFocusRing,
    disabled: disabledProp,
    readOnly,
    type = 'button',
    href,
    ...other
  } = props as IWithAsProp<IButtonBaseOwnProps>;

  const disabled = disabledProp || readOnly;
  const { visualState, setRef: setVisualStateRef } = useVisualState(
    visualStateProp,
    { disabled },
  );
  const handleRef = useMergeRefs([forwardedRef, setVisualStateRef]);

  const { theme, settings } = useComponentTheme('ButtonBase');
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(theme.styles, styles),
    [theme.styles, styles],
  );
  const sxf = useMemo(
    () => stylePropsFactory<IButtonBaseStyleKey>(stylesCombinator, visualState),
    [stylesCombinator, visualState],
  );

  const Component = as ?? (href ? settings.linkAs : BUTTON_BASE_DEFAULT_TAG);

  return (
    <Component
      {...sxf(
        'host',
        disabled && 'host$disabled',
        withLeadingIcon && 'host$withLeadingIcon',
        withTrailingIcon && 'host$withTrailingIcon',
        theme.vars,
        sx,
      )}
      ref={handleRef}
      href={href}
      role='button'
      tabIndex={disabled ? -1 : 0}
      disabled={disabled}
      type={type}
      {...other}
    >
      <span {...sxf('touchTarget')} />
      <Elevation
        styles={[theme.elevationStyles, ...asArray(innerStyles?.elevation)]}
        disabled={disabled}
      />
      <div {...sxf('outline', disabled && 'outline$disabled')} />
      <div {...sxf('background', disabled && 'background$disabled')} />
      <FocusRing
        styles={[theme.focusRingStyles, ...asArray(innerStyles?.focusRing)]}
        for={forwardedRef}
        visualState={visualState}
        inward={inwardFocusRing}
      />
      <StateLayer
        styles={[theme.stateLayerStyles, ...asArray(innerStyles?.stateLayer)]}
        for={forwardedRef}
        disabled={disabled}
        visualState={visualState}
      />
      {children}
    </Component>
  );
});
