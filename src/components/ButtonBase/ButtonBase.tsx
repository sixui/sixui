import { forwardRef, useMemo } from 'react';
import { useMergeRefs } from '@floating-ui/react';

import type { IButtonBaseProps } from './ButtonBase.types';
import {
  createPolymorphicComponent,
  IWithAsProp,
} from '~/helpers/react/polymorphicComponentTypes';
import { useVisualState } from '~/components/VisualState';
import { stylesCombinatorFactory } from '~/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '~/helpers/stylePropsFactory';
import { useComponentTheme } from '~/hooks/useComponentTheme';
import { Elevation } from '~/components/Elevation';
import { FocusRing } from '~/components/FocusRing';
import { StateLayer } from '~/components/StateLayer';
import { Base } from '~/components/Base';
import { buttonBaseStyles } from './ButtonBase.styles';
import { useForwardedRef } from '~/hooks/useForwardedRef';

export const ButtonBase = createPolymorphicComponent<
  'button',
  IButtonBaseProps
>(
  forwardRef<HTMLButtonElement, IButtonBaseProps>(
    function ButtonBase(props, forwardedRef) {
      const {
        component,
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
      } = props as IWithAsProp<IButtonBaseProps>;

      const innerRef = useForwardedRef(forwardedRef);
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

      const rootElement =
        component ??
        (href ? (componentTheme.settings?.linkAs ?? 'a') : 'button');

      return (
        <Base
          component={rootElement}
          href={href}
          role='button'
          tabIndex={visuallyDisabled ? -1 : 0}
          type={type}
          {...other}
          sx={stylesCombinator(
            'host',
            visuallyDisabled && 'host$disabled',
            componentTheme.overridenStyles,
            sx,
          )}
          ref={handleRef}
        >
          <span {...sxf('touchTarget')} />
          <Elevation
            styles={innerStyles?.elevation}
            disabled={visuallyDisabled}
          />
          <div {...sxf('outline', visuallyDisabled && 'outline$disabled')} />
          <div
            {...sxf('background', visuallyDisabled && 'background$disabled')}
          />
          {visuallyDisabled ? null : (
            <FocusRing
              styles={innerStyles?.focusRing}
              for={innerRef}
              visualState={visualState}
              inward={inwardFocusRing}
            />
          )}
          <StateLayer
            styles={innerStyles?.stateLayer}
            for={innerRef}
            disabled={visuallyDisabled}
            visualState={visualState}
          />
          {children}
        </Base>
      );
    },
  ),
);
