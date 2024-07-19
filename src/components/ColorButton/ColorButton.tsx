import { forwardRef } from 'react';
import { asArray } from '@olivierpascal/helpers';

import type {
  IPolymorphicRef,
  IWithAsProp,
} from '@/helpers/react/polymorphicComponentTypes';
import type {
  COLOR_BUTTON_DEFAULT_TAG,
  IColorButtonOwnProps,
  IColorButtonProps,
} from './ColorButton.types';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { ButtonBase } from '@/components/ButtonBase';
import { colorButtonTheme } from './ColorButton.stylex';
import { IconCheckMark } from '@/components/Icons';
import { ColorTag } from '@/components/ColorTag';
import {
  colorButtonButtonBaseStyles,
  colorButtonColorTagStyles,
  colorButtonFocusRingStyles,
  colorButtonStateLayerStyles,
} from './ColorButton.styles';

type IColorButton = <
  TRoot extends React.ElementType = typeof COLOR_BUTTON_DEFAULT_TAG,
>(
  props: IColorButtonProps<TRoot>,
) => React.ReactNode;

export const ColorButton: IColorButton = forwardRef(function ColorButton<
  TRoot extends React.ElementType = typeof COLOR_BUTTON_DEFAULT_TAG,
>(props: IColorButtonProps<TRoot>, forwardedRef?: IPolymorphicRef<TRoot>) {
  const {
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

  return (
    <ButtonBase
      as={as}
      sx={[colorButtonTheme, componentTheme.overridenStyles, sx]}
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
      <ColorTag
        styles={[colorButtonColorTagStyles, ...asArray(innerStyles?.colorTag)]}
        backgroundColor={backgroundColor}
        foregroundColor={foregroundColor}
        label={children}
        icon={selected ? <IconCheckMark aria-hidden /> : undefined}
      />
    </ButtonBase>
  );
});
