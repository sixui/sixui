import type { IColorSchemeVariant } from '@/components/ColorScheme';
import type { IColorScheme, IThemeSchemes } from '@/themes/base';
import { isObject } from '@/helpers/isObject';

export const getSchemeColorsHex = (
  token: keyof IColorScheme,
  themeSchemes: IThemeSchemes,
  fallbackColor?: string | Record<IColorSchemeVariant, string>,
): Record<IColorSchemeVariant, string> => {
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
