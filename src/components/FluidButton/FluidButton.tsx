import { forwardRef } from 'react';
import { asArray } from '@olivierpascal/helpers';

import type { IFluidButtonProps } from './FluidButton.types';
import { createPolymorphicComponent } from '~/helpers/react/polymorphicComponentTypes';
import { useStyles } from '~/hooks/useStyles';
import { ButtonBase } from '../ButtonBase';
import {
  fluidButtonButtonBaseStyles,
  fluidButtonFocusRingStyles,
  fluidButtonStateLayerStyles,
  fluidButtonStyles,
} from './FluidButton.styles';
import { fluidButtonTheme } from './FluidButton.stylex';

export const FluidButton = createPolymorphicComponent<
  'button',
  IFluidButtonProps
>(
  forwardRef<HTMLButtonElement, IFluidButtonProps>(
    function FluidButton(props, forwardedRef) {
      const { styles, sx, innerStyles, children, ...other } = props;

      const { getStyles, globalStyles } = useStyles({
        name: 'FluidButton',
        styles: [fluidButtonStyles, styles],
      });

      const visuallyDisabled = other.disabled || other.readOnly;

      return (
        <ButtonBase
          sx={[fluidButtonTheme, globalStyles, sx]}
          styles={[
            fluidButtonButtonBaseStyles,
            ...asArray(innerStyles?.buttonBase),
          ]}
          innerStyles={{
            ...innerStyles,
            stateLayer: [
              fluidButtonStateLayerStyles,
              ...asArray(innerStyles?.stateLayer),
            ],
            focusRing: [
              fluidButtonFocusRingStyles,
              ...asArray(innerStyles?.focusRing),
            ],
          }}
          {...other}
          ref={forwardedRef}
        >
          <div
            {...getStyles(
              'textLabel',
              visuallyDisabled && 'textLabel$disabled',
            )}
          >
            {children}
          </div>
        </ButtonBase>
      );
    },
  ),
);
