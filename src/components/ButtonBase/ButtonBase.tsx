import { forwardRef, useMemo } from 'react';
import { useMergeRefs } from '@floating-ui/react';

import type {
  IPolymorphicRef,
  IWithAsProp,
} from '@/helpers/react/polymorphicComponentTypes';
import { useVisualState } from '@/components/VisualState';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { Elevation } from '@/components/Elevation';
import { FocusRing } from '@/components/FocusRing';
import { StateLayer } from '@/components/StateLayer';
import {
  BUTTON_BASE_DEFAULT_TAG,
  type IButtonBaseProps,
  type IButtonBaseOwnProps,
} from './ButtonBase.types';
import { buttonBaseStyles } from './ButtonBase.styles';

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

  const { overridenStyles, settings } = useComponentTheme('ButtonBase');
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(buttonBaseStyles, styles),
    [styles],
  );
  const sxf = useMemo(
    () => stylePropsFactory(stylesCombinator, visualState),
    [stylesCombinator, visualState],
  );

  const Component = as ?? (href ? settings.linkAs : BUTTON_BASE_DEFAULT_TAG);

  return (
    <Component
      {...sxf('host', disabled && 'host$disabled', overridenStyles, sx)}
      ref={handleRef}
      href={href}
      role='button'
      tabIndex={disabled ? -1 : 0}
      disabled={disabled}
      type={type}
      {...other}
    >
      <span {...sxf('touchTarget')} />
      <Elevation styles={innerStyles?.elevation} disabled={disabled} />
      <div {...sxf('outline', disabled && 'outline$disabled')} />
      <div {...sxf('background', disabled && 'background$disabled')} />
      <FocusRing
        styles={innerStyles?.focusRing}
        for={forwardedRef}
        visualState={visualState}
        inward={inwardFocusRing}
      />
      <StateLayer
        styles={innerStyles?.stateLayer}
        for={forwardedRef}
        disabled={disabled}
        visualState={visualState}
      />
      {children}
    </Component>
  );
});
