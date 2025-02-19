import { argbFromHex } from '@material/material-color-utilities';

import type { IThemeColorSchemeValues } from '~/components/Theme';
import { DynamicSchemeVariant } from './getMaterialDynamicSchemeClass';
import { getMaterialSchemeFromSourceColor } from './getMaterialSchemeFromSourceColor';
import { getRolesFromMaterialScheme } from './getRolesFromMaterialScheme';

export const generateThemeFromSourceColor = (
  sourceColor: string,
  schemeVariant = DynamicSchemeVariant.sixui,
  contrast = 0.0,
): Partial<IThemeColorSchemeValues> => {
  const argbSourceColor = argbFromHex(sourceColor);
  const lightScheme = getMaterialSchemeFromSourceColor(
    argbSourceColor,
    schemeVariant,
    false,
    contrast,
  );
  const darkScheme = getMaterialSchemeFromSourceColor(
    argbSourceColor,
    schemeVariant,
    true,
    contrast,
  );

  return {
    light: getRolesFromMaterialScheme(lightScheme),
    dark: getRolesFromMaterialScheme(darkScheme),
  };
};
