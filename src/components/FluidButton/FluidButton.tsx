import { forwardRef, useMemo } from 'react';
import { asArray } from '@olivierpascal/helpers';

import type {
  IPolymorphicRef,
  IWithAsProp,
} from '~/helpers/react/polymorphicComponentTypes';
import type {
  FLUID_BUTTON_DEFAULT_TAG,
  IFluidButtonOwnProps,
  IFluidButtonProps,
} from './FluidButton.types';
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

type IFluidButton = <
  TRoot extends React.ElementType = typeof FLUID_BUTTON_DEFAULT_TAG,
>(
  props: IFluidButtonProps<TRoot>,
) => React.ReactNode;

export const FluidButton: IFluidButton = forwardRef(function FluidButton<
  TRoot extends React.ElementType = typeof FLUID_BUTTON_DEFAULT_TAG,
>(props: IFluidButtonProps<TRoot>, forwardedRef?: IPolymorphicRef<TRoot>) {
  const { styles, sx, as, innerStyles, children, ...other } =
    props as IWithAsProp<IFluidButtonOwnProps>;

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
      as={as}
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
});
