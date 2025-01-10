import { forwardRef } from 'react';
import { asArray } from '@olivierpascal/helpers';
import stylex from '@stylexjs/stylex';

import type { IColorButtonProps } from './ColorButton.types';
import { iconCheckmark } from '~/assets/icons';
import { ButtonBase } from '~/components/ButtonBase';
import { SvgIcon } from '~/components/SvgIcon';
import { useStyles } from '~/hooks/useStyles';
import { createPolymorphicComponent } from '~/utils/component/createPolymorphicComponent';
import { ColorIndicator } from '../ColorIndicator/ColorIndicator';
import { colorButtonStateTokens } from './ColorButton.state.stylex';
import {
  colorButtonButtonBaseStyles,
  colorButtonColorTagStyles,
  colorButtonFocusRingStyles,
  colorButtonStateLayerStyles,
  colorButtonStyles,
} from './ColorButton.styles';
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
          <ColorIndicator
            backgroundColor={backgroundColor}
            foregroundColor={foregroundColor}
            label={children}
            icon={selected ? <SvgIcon icon={iconCheckmark} /> : undefined}
          />
        </ButtonBase>
      );
    },
  ),
);
