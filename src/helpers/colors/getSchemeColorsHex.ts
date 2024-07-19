import type { IColorSchemeVariant } from '@/components/ColorScheme';
import type { IColorScheme, IThemeSchemes } from '@/themes/base';
import type { IColor } from '@/helpers/types';
import { isObject } from '@/helpers/isObject';

export const getSchemeColorsHex = (
  token: keyof IColorScheme,
  themeSchemes: IThemeSchemes,
  fallbackColor?: IColor | Record<IColorSchemeVariant, IColor>,
): Record<IColorSchemeVariant, IColor> => {
  const lightSourceColorHex = isObject(fallbackColor)
    ? fallbackColor.light
    : (fallbackColor ?? themeSchemes.light[token]);
  const darkSourceColorHex = isObject(fallbackColor)
    ? fallbackColor.dark
    : (fallbackColor ?? themeSchemes.dark[token]);

  return {
    light: lightSourceColorHex,
    dark: darkSourceColorHex,
  };
};
