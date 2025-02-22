import { Hct, SchemeContent } from '@material/material-color-utilities';

import {
  DynamicSchemeVariant,
  getMaterialDynamicSchemeClass,
} from './getMaterialDynamicSchemeClass';

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
  schemeVariant = DynamicSchemeVariant.tonalSpot,
  isDark = false,
  contrastLevel = 0.0,
): SchemeContent => {
  const sourceColorHct = Hct.fromInt(sourceColorArgb);
  const dynamicSchemeClass = getMaterialDynamicSchemeClass(schemeVariant);
  const scheme = new dynamicSchemeClass(sourceColorHct, isDark, contrastLevel);

  return scheme;
};
