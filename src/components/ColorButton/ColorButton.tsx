import { forwardRef, useMemo } from 'react';
import { asArray } from '@olivierpascal/helpers';
import stylex from '@stylexjs/stylex';

import type { IColorButtonProps } from './ColorButton.types';
import { createPolymorphicComponent } from '~/helpers/react/polymorphicComponentTypes';
import { useComponentTheme } from '~/hooks/useComponentTheme';
import { ButtonBase } from '../ButtonBase';
import { SvgIcon } from '../SvgIcon';
import { iconCheckMark } from '~/assets/icons';
import { ColorTag } from '../ColorTag';
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

      const componentTheme = useComponentTheme('ColorButton');
      const stylesCombinator = useMemo(
        () => stylesCombinatorFactory(colorButtonStyles, styles),
        [styles],
      );

      return (
        <ButtonBase
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
