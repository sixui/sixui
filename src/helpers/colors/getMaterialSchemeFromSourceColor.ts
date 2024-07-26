import { Hct, type SchemeContent } from '@material/material-color-utilities';

import { getMaterialDynamicSchemeClass } from './getMaterialDynamicSchemeClass';
import { IDynamicSchemeVariant } from './generateThemeFromSourceColor';

/**
 * Generate a scheme from a source color
 *
 * @param sourceColor - Source color
 * @param isDark - Dark mode
 * @param schemeVariant - Scheme variant
 * @param contrastLevel - Contrast level between -1.0 and 1.0
 * @param customColors - Array of custom colors
 * @returns Scheme object
 */
export const getMaterialSchemeFromSourceColor = (
  sourceColorArgb: number,
  schemeVariant = IDynamicSchemeVariant.tonalSpot,
  isDark = false,
  contrastLevel = 0.0,
  // customColors = []
): SchemeContent => {
  const sourceColorHct = Hct.fromInt(sourceColorArgb);
  const dynamicSchemeClass = getMaterialDynamicSchemeClass(schemeVariant);
  const scheme = new dynamicSchemeClass(sourceColorHct, isDark, contrastLevel);

  return scheme;
};
