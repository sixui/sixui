import { argbFromHex } from '@material/material-color-utilities';

import type { ITheme } from '@/themes/base';
import { IDynamicSchemeVariant } from './getMaterialDynamicSchemeClass';
import { getRolesFromMaterialScheme } from './getRolesFromMaterialScheme';
import { getMaterialSchemeFromSourceColor } from './getMaterialSchemeFromSourceColor';

export const generateThemeFromSourceColor = (
  sourceColor: string,
  schemeVariant = IDynamicSchemeVariant.sixui,
  contrast = 0.0,
): ITheme => {
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

  const theme: ITheme = {
    name: 'Dynamic Theme',
    source: {
      color: sourceColor,
      schemeVariant: IDynamicSchemeVariant[schemeVariant],
      contrast,
    },
    schemes: {
      light: getRolesFromMaterialScheme(lightScheme),
      dark: getRolesFromMaterialScheme(darkScheme),
    },
  };

  return theme;
};
