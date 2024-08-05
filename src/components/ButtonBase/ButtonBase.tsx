import { forwardRef } from 'react';
import { useMergeRefs } from '@floating-ui/react';

import type { IButtonBaseProps } from './ButtonBase.types';
import {
  createPolymorphicComponent,
  IWithAsProp,
} from '~/helpers/react/polymorphicComponentTypes';
import { useVisualState } from '../VisualState';
import { useForwardedRef } from '~/hooks/useForwardedRef';
import { useStyles } from '~/hooks/useStyles';
import { Elevation } from '../Elevation';
import { FocusRing } from '../FocusRing';
import { StateLayer } from '../StateLayer';
import { Base } from '../Base';
import { buttonBaseStyles } from './ButtonBase.styles';

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

      const { combineStyles, getStyles, globalStyles, settings } = useStyles({
        name: 'ButtonBase',
        styles: [buttonBaseStyles, styles],
        visualState,
      });

      const rootElement =
        component ?? (href ? (settings?.linkAs ?? 'a') : 'button');

      return (
        <Base
          component={rootElement}
          href={href}
          role='button'
          tabIndex={visuallyDisabled ? -1 : 0}
          type={type}
          {...other}
          sx={[
            globalStyles,
            combineStyles('host', visuallyDisabled && 'host$disabled'),
            sx,
          ]}
          ref={handleRef}
        >
          <span {...getStyles('touchTarget')} />
          <Elevation
            styles={innerStyles?.elevation}
            disabled={visuallyDisabled}
          />
          <div
            {...getStyles('outline', visuallyDisabled && 'outline$disabled')}
          />
          <div
            {...getStyles(
              'background',
              visuallyDisabled && 'background$disabled',
            )}
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
