import { forwardRef, useMemo } from 'react';
import { asArray } from '@olivierpascal/helpers';

import type {
  IPolymorphicRef,
  IWithAsProp,
} from '@/helpers/react/polymorphicComponentTypes';
import type {
  IFluidButtonStyleKey,
  IFluidButtonStyleVarKey,
} from './FluidButton.styledefs';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { ButtonBase } from '@/components/atoms/ButtonBase';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import {
  FLUID_BUTTON_DEFAULT_TAG,
  type IFluidButtonOwnProps,
  type IFluidButtonProps,
} from './FluidButtonProps';

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

  const { theme } = useComponentTheme('FluidButton');
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(theme.styles, styles),
    [theme.styles, styles],
  );
  const sxf = useMemo(
    () =>
      stylePropsFactory<IFluidButtonStyleKey, IFluidButtonStyleVarKey>(
        stylesCombinator,
      ),
    [stylesCombinator],
  );

  const disabled = other.disabled || other.readOnly;

  return (
    <ButtonBase
      as={as}
      styles={[theme.buttonBaseStyles, ...asArray(innerStyles?.buttonBase)]}
      sx={[theme.vars, sx]}
      innerStyles={{
        ...innerStyles,
        stateLayer: [
          theme.stateLayerStyles,
          ...asArray(innerStyles?.stateLayer),
        ],
        focusRing: [theme.focusRingStyles, ...asArray(innerStyles?.focusRing)],
      }}
      ref={forwardedRef}
      {...other}
    >
      <div {...sxf('textLabel', disabled && 'textLabel$disabled')}>
        {children}
      </div>
    </ButtonBase>
  );
});
