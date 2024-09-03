import { forwardRef } from 'react';
import stylex from '@stylexjs/stylex';

import type { IColorTagProps } from './ColorTag.types';
import { getTextContrastColor } from '~/helpers/colors/getTextContrastColor';
import { createPolymorphicComponent } from '~/utils/component/createPolymorphicComponent';
import { isValidHexColor } from '~/helpers/colors/isValidHexColor';
import { useStyles } from '~/hooks/useStyles';
import { Base } from '../Base';
import { colorTagTokens, colorTagTheme } from './ColorTag.stylex';
import { colorTagStyles } from './ColorTag.styles';

const localStyles = stylex.create({
  backgroundColor: (color: string) => ({
    [colorTagTokens.containerColor]: color,
  }),
  foregroundColor: (color: string) => ({
    [colorTagTokens.labelTextColor]: color,
    [colorTagTokens.iconColor]: color,
  }),
});

export const ColorTag = createPolymorphicComponent<'div', IColorTagProps>(
  forwardRef<HTMLDivElement, IColorTagProps>(
    function ColorTag(props, forwardedRef) {
      const {
        styles,
        sx,
        children,
        label,
        icon,
        backgroundColor,
        foregroundColor,
        ...other
      } = props;

      const { combineStyles, getStyles, globalStyles } = useStyles({
        componentName: 'ColorTag',
        styles: [colorTagStyles, styles],
      });

      const foregroundColorHex =
        foregroundColor ??
        (backgroundColor ? getTextContrastColor(backgroundColor) : undefined);
      const isEmpty = !backgroundColor;
      const isInvalid = !!backgroundColor && !isValidHexColor(backgroundColor);

      return (
        <Base
          {...other}
          sx={[
            colorTagTheme,
            globalStyles,
            backgroundColor && isValidHexColor(backgroundColor)
              ? localStyles.backgroundColor(backgroundColor)
              : undefined,
            foregroundColorHex
              ? localStyles.foregroundColor(foregroundColorHex)
              : undefined,
            combineStyles(
              'host',
              isEmpty && 'host$empty',
              isInvalid && 'host$invalid',
            ),
            sx,
          ]}
          ref={forwardedRef}
        >
          {icon ? (
            <div {...getStyles('icon')}>{icon}</div>
          ) : label ? (
            <div {...getStyles('label')}>{label}</div>
          ) : null}
          {children}
        </Base>
      );
    },
  ),
);
