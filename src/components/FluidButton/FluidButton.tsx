import { forwardRef, useMemo } from 'react';
import { asArray } from '@olivierpascal/helpers';

import type { IFluidButtonProps } from './FluidButton.types';
import { createPolymorphicComponent } from '~/helpers/react/polymorphicComponentTypes';
import { useComponentTheme } from '~/hooks/useComponentTheme';
import { stylesCombinatorFactory } from '~/helpers/stylesCombinatorFactory';
import { ButtonBase } from '~/components/ButtonBase';
import { stylePropsFactory } from '~/helpers/stylePropsFactory';
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

      const componentTheme = useComponentTheme('FluidButton');
      const stylesCombinator = useMemo(
        () => stylesCombinatorFactory(fluidButtonStyles, styles),
        [styles],
      );
      const sxf = useMemo(
        () => stylePropsFactory(stylesCombinator),
        [stylesCombinator],
      );

      const visuallyDisabled = other.disabled || other.softDisabled;

      return (
        <ButtonBase
          sx={[fluidButtonTheme, componentTheme.overridenStyles, sx]}
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
          <div {...sxf('textLabel', visuallyDisabled && 'textLabel$disabled')}>
            {children}
          </div>
        </ButtonBase>
      );
    },
  ),
);
