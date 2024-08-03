import { forwardRef, useMemo } from 'react';
import { asArray } from '@olivierpascal/helpers';
import stylex from '@stylexjs/stylex';

import type {
  IPolymorphicRef,
  IWithAsProp,
} from '~/helpers/react/polymorphicComponentTypes';
import type {
  COLOR_BUTTON_DEFAULT_TAG,
  IColorButtonOwnProps,
  IColorButtonProps,
} from './ColorButton.types';
import { useComponentTheme } from '~/hooks/useComponentTheme';
import { ButtonBase } from '~/components/ButtonBase';
import { SvgIcon } from '~/components/SvgIcon';
import { iconCheckMark } from '~/assets/icons';
import { ColorTag } from '~/components/ColorTag';
import {
  colorButtonButtonBaseStyles,
  colorButtonColorTagStyles,
  colorButtonFocusRingStyles,
  colorButtonStateLayerStyles,
  colorButtonStyles,
} from './ColorButton.styles';
import { stylesCombinatorFactory } from '~/helpers/stylesCombinatorFactory';
import { colorButtonStateTokens } from './ColorButton.state.stylex';
import { colorButtonTheme } from './ColorButton.stylex';

const localStyles = stylex.create({
  backgroundColor: (color: string) => ({
    [colorButtonStateTokens.containerColor]: color,
  }),
});

type IColorButton = <
  TRoot extends React.ElementType = typeof COLOR_BUTTON_DEFAULT_TAG,
>(
  props: IColorButtonProps<TRoot>,
) => React.ReactNode;

export const ColorButton: IColorButton = forwardRef(function ColorButton<
  TRoot extends React.ElementType = typeof COLOR_BUTTON_DEFAULT_TAG,
>(props: IColorButtonProps<TRoot>, forwardedRef?: IPolymorphicRef<TRoot>) {
  const {
    styles,
    sx,
    as,
    innerStyles,
    children,
    selected,
    backgroundColor,
    foregroundColor,
    ...other
  } = props as IWithAsProp<IColorButtonOwnProps>;

  const componentTheme = useComponentTheme('ColorButton');
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(colorButtonStyles, styles),
    [styles],
  );

  return (
    <ButtonBase
      as={as}
      sx={[
        colorButtonTheme,
        componentTheme.overridenStyles,
        stylesCombinator('host'),
        backgroundColor
          ? localStyles.backgroundColor(backgroundColor)
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
      {...other}
      ref={forwardedRef}
    >
      <ColorTag
        styles={[colorButtonColorTagStyles, ...asArray(innerStyles?.colorTag)]}
        backgroundColor={backgroundColor}
        foregroundColor={foregroundColor}
        label={children}
        icon={selected ? <SvgIcon icon={iconCheckMark} /> : undefined}
      />
    </ButtonBase>
  );
});
