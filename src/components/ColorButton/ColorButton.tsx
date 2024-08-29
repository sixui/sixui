import { forwardRef } from 'react';
import { asArray } from '@olivierpascal/helpers';
import stylex from '@stylexjs/stylex';

import type { IColorButtonProps } from './ColorButton.types';
import { createPolymorphicComponent } from '~/helpers/react/polymorphicComponentTypes';
import { ButtonBase } from '~/components/ButtonBase';
import { SvgIcon } from '~/components/SvgIcon';
import { iconCheckMark } from '~/assets/icons';
import { ColorTag } from '~/components/ColorTag';
import { useStyles } from '~/hooks/useStyles';
import {
  colorButtonButtonBaseStyles,
  colorButtonColorTagStyles,
  colorButtonFocusRingStyles,
  colorButtonStateLayerStyles,
  colorButtonStyles,
} from './ColorButton.styles';
import { colorButtonStateTokens } from './ColorButton.state.stylex';
import { colorButtonTheme } from './ColorButton.stylex';

const localStyles = stylex.create({
  backgroundColor: (color: string) => ({
    [colorButtonStateTokens.containerColor]: color,
  }),
});

export const ColorButton = createPolymorphicComponent<
  'button',
  IColorButtonProps
>(
  forwardRef<HTMLButtonElement, IColorButtonProps>(
    function ColorButton(props, forwardedRef) {
      const {
        styles,
        sx,
        innerStyles,
        children,
        selected,
        backgroundColor,
        foregroundColor,
        ...other
      } = props;

      const { combineStyles, globalStyles } = useStyles({
        componentName: 'ColorButton',
        styles: [colorButtonStyles, styles],
      });

      return (
        <ButtonBase
          sx={[
            colorButtonTheme,
            globalStyles,
            combineStyles('host'),
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
            styles={[
              colorButtonColorTagStyles,
              ...asArray(innerStyles?.colorTag),
            ]}
            backgroundColor={backgroundColor}
            foregroundColor={foregroundColor}
            label={children}
            icon={selected ? <SvgIcon icon={iconCheckMark} /> : undefined}
          />
        </ButtonBase>
      );
    },
  ),
);
