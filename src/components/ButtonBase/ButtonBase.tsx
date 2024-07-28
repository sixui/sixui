import { forwardRef, useMemo } from 'react';
import { useMergeRefs } from '@floating-ui/react';

import type {
  IPolymorphicRef,
  IWithAsProp,
} from '~/helpers/react/polymorphicComponentTypes';
import { useVisualState } from '~/components/VisualState';
import { stylesCombinatorFactory } from '~/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '~/helpers/stylePropsFactory';
import { useComponentTheme } from '~/hooks/useComponentTheme';
import { Elevation } from '~/components/Elevation';
import { FocusRing } from '~/components/FocusRing';
import { StateLayer } from '~/components/StateLayer';
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
    softDisabled,
    type = 'button',
    href,
    ...other
  } = props as IWithAsProp<IButtonBaseOwnProps>;

  const visuallyDisabled = other.disabled || softDisabled;
  const { visualState, setRef: setVisualStateRef } = useVisualState(
    visualStateProp,
    { disabled: visuallyDisabled },
  );
  const handleRef = useMergeRefs([forwardedRef, setVisualStateRef]);

  const componentTheme = useComponentTheme('ButtonBase');
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(buttonBaseStyles, styles),
    [styles],
  );
  const sxf = useMemo(
    () => stylePropsFactory(stylesCombinator, visualState),
    [stylesCombinator, visualState],
  );

  const Component =
    as ??
    (href ? (componentTheme.settings?.linkAs ?? 'a') : BUTTON_BASE_DEFAULT_TAG);

  return (
    <Component
      {...sxf(
        'host',
        visuallyDisabled && 'host$disabled',
        componentTheme.overridenStyles,
        sx,
      )}
      ref={handleRef}
      href={href}
      role='button'
      tabIndex={visuallyDisabled ? -1 : 0}
      type={type}
      {...other}
    >
      <span {...sxf('touchTarget')} />
      <Elevation styles={innerStyles?.elevation} disabled={visuallyDisabled} />
      <div {...sxf('outline', visuallyDisabled && 'outline$disabled')} />
      <div {...sxf('background', visuallyDisabled && 'background$disabled')} />
      {visuallyDisabled ? null : (
        <FocusRing
          styles={innerStyles?.focusRing}
          for={forwardedRef}
          visualState={visualState}
          inward={inwardFocusRing}
        />
      )}
      <StateLayer
        styles={innerStyles?.stateLayer}
        for={forwardedRef}
        disabled={visuallyDisabled}
        visualState={visualState}
      />
      {children}
    </Component>
  );
});
