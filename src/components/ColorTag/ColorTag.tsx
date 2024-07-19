import { forwardRef, useMemo } from 'react';
import stylex from '@stylexjs/stylex';

import type { IColorTagProps } from './ColorTag.types';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { colorTagTokens, colorTagTheme } from './ColorTag.stylex';
import { colorToHex } from '@/helpers/colors/colorToHex';
import { getTextContrastColor } from '@/helpers/colors/getTextContrastColor';
import { colorTagStyles } from './ColorTag.styles';
import { isValidHexColor } from '@/helpers/colors/isValidHexColor';

const localStyles = stylex.create({
  backgroundColor: (color: string) => ({
    [colorTagTokens.containerColor]: color,
  }),
  foregroundColor: (color: string) => ({
    [colorTagTokens.labelTextColor]: color,
    [colorTagTokens.iconColor]: color,
  }),
});

export const ColorTag = forwardRef<HTMLDivElement, IColorTagProps>(
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

    const componentTheme = useComponentTheme('ColorTag');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(colorTagStyles, styles),
      [styles],
    );
    const sxf = useMemo(
      () => stylePropsFactory(stylesCombinator),
      [stylesCombinator],
    );

    const backgroundColorHex = backgroundColor
      ? colorToHex(backgroundColor)
      : undefined;
    const foregroundColorHex = foregroundColor
      ? colorToHex(foregroundColor)
      : backgroundColorHex
        ? colorToHex(getTextContrastColor(backgroundColorHex))
        : undefined;
    const isEmpty = !backgroundColorHex;
    const isInvalid =
      !!backgroundColorHex && !isValidHexColor(backgroundColorHex);

    return (
      <div
        {...sxf(
          colorTagTheme,
          componentTheme.overridenStyles,
          'host',
          isEmpty && 'host$empty',
          isInvalid && 'host$invalid',
          backgroundColorHex && isValidHexColor(backgroundColorHex)
            ? localStyles.backgroundColor(backgroundColorHex)
            : undefined,
          foregroundColorHex
            ? localStyles.foregroundColor(foregroundColorHex)
            : undefined,
          sx,
        )}
        {...other}
        ref={forwardedRef}
      >
        {isEmpty || isInvalid ? <div {...sxf('emptyCrosshairs')} /> : null}
        {icon ? (
          <div {...sxf('icon')}>{icon}</div>
        ) : label ? (
          <div {...sxf('label')}>{label}</div>
        ) : null}
        {children}
      </div>
    );
  },
);
