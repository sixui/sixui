import { forwardRef, useMemo } from 'react';
import { asArray } from '@olivierpascal/helpers';
import stylex from '@stylexjs/stylex';

import type {
  IPolymorphicRef,
  IWithAsProp,
} from '@/helpers/react/polymorphicComponentTypes';
import type {
  FLUID_BUTTON_DEFAULT_TAG,
  IColorButtonOwnProps,
  IColorButtonProps,
} from './ColorButton.types';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { ButtonBase } from '@/components/ButtonBase';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import {
  colorButtonButtonBaseStyles,
  colorButtonFocusRingStyles,
  colorButtonStateLayerStyles,
  colorButtonStyles,
} from './ColorButton.styles';
import { colorButtonTokens, colorButtonTheme } from './ColorButton.stylex';
import { IconCheckMark } from '../Icons';

const localStyles = stylex.create({
  backgroundColor: (color: string) => ({
    [colorButtonTokens.containerColor]: color,
  }),
  foregroundColor: (color: string) => ({
    [colorButtonTokens.labelTextColor]: color,
    [colorButtonTokens.iconColor]: color,
  }),
});

type IColorButton = <
  TRoot extends React.ElementType = typeof FLUID_BUTTON_DEFAULT_TAG,
>(
  props: IColorButtonProps<TRoot>,
) => React.ReactNode;

export const ColorButton: IColorButton = forwardRef(function ColorButton<
  TRoot extends React.ElementType = typeof FLUID_BUTTON_DEFAULT_TAG,
>(props: IColorButtonProps<TRoot>, forwardedRef?: IPolymorphicRef<TRoot>) {
  const {
    styles,
    sx,
    as,
    innerStyles,
    children,
    selected,
    backgroundColorHex,
    foregroundColorHex,
    ...other
  } = props as IWithAsProp<IColorButtonOwnProps>;

  const componentTheme = useComponentTheme('ColorButton');
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(colorButtonStyles, styles),
    [styles],
  );
  const sxf = useMemo(
    () => stylePropsFactory(stylesCombinator),
    [stylesCombinator],
  );

  return (
    <ButtonBase
      as={as}
      sx={[
        colorButtonTheme,
        componentTheme.overridenStyles,
        backgroundColorHex
          ? localStyles.backgroundColor(backgroundColorHex)
          : undefined,
        foregroundColorHex
          ? localStyles.foregroundColor(foregroundColorHex)
          : undefined,
        sx,
      ]}
      styles={[
        colorButtonButtonBaseStyles,
        ...asArray(innerStyles?.buttonBase),
      ]}
      innerStyles={{
        ...innerStyles,
        stateLayer: [
          colorButtonStateLayerStyles,
          ...asArray(innerStyles?.stateLayer),
        ],
        focusRing: [
          colorButtonFocusRingStyles,
          ...asArray(innerStyles?.focusRing),
        ],
      }}
      ref={forwardedRef}
      {...other}
    >
      {selected ? (
        <div {...sxf('icon')}>
          <IconCheckMark aria-hidden />
        </div>
      ) : (
        <div {...sxf('label')}>{children}</div>
      )}
    </ButtonBase>
  );
});
