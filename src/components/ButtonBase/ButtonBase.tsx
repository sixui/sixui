import { forwardRef, useRef } from 'react';
import { useMergeRefs } from '@floating-ui/react';

import type { IButtonBaseProps } from './ButtonBase.types';
import {
  createPolymorphicComponent,
  IWithAsProp,
} from '~/helpers/react/polymorphicComponentTypes';
import { useVisualState } from '../VisualState';
import { useStyles } from '~/hooks/useStyles';
import { Elevation } from '../Elevation';
import { FocusRing } from '../FocusRing';
import { StateLayer } from '../StateLayer';
import { Base } from '../Base';
import { TouchTarget } from '../TouchTarget';
import { buttonBaseStyles } from './ButtonBase.styles';

export const ButtonBase = createPolymorphicComponent<
  'button',
  IButtonBaseProps
>(
  forwardRef<HTMLButtonElement, IButtonBaseProps>(
    function ButtonBase(props, forwardedRef) {
      const {
        as,
        styles,
        sx,
        innerStyles,
        visualState: visualStateProp,
        children,
        inwardFocusRing,
        readOnly,
        type = 'button',
        href,
        ...other
      } = props as IWithAsProp<IButtonBaseProps>;

      const visuallyDisabled = other.disabled || readOnly;
      const { visualState, setRef: setVisualStateRef } = useVisualState(
        visualStateProp,
        { disabled: visuallyDisabled },
      );

      const visualStateRef = useRef<HTMLElement>(null);
      const handleRef = useMergeRefs([
        forwardedRef,
        setVisualStateRef,
        visualStateRef,
      ]);

      const { combineStyles, getStyles, globalStyles, settings } = useStyles({
        name: 'ButtonBase',
        styles: [buttonBaseStyles, styles],
        visualState,
      });

      const rootElement = as ?? (href ? (settings?.linkAs ?? 'a') : 'button');

      return (
        <Base
          as={rootElement}
          href={href}
          role='button'
          tabIndex={visuallyDisabled ? -1 : 0}
          type={type}
          {...other}
          visualState={visualState}
          sx={[
            globalStyles,
            combineStyles('host', visuallyDisabled && 'host$disabled'),
            sx,
          ]}
          ref={handleRef}
        >
          <TouchTarget visualState={visualState} disabled={visuallyDisabled} />
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
              for={visualStateRef}
              visualState={visualState}
              inward={inwardFocusRing}
            />
          )}
          <StateLayer
            styles={innerStyles?.stateLayer}
            for={visualStateRef}
            disabled={visuallyDisabled}
            visualState={visualState}
          />
          {children}
        </Base>
      );
    },
  ),
);
