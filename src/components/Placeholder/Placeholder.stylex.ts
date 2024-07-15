import stylex from '@stylexjs/stylex';

import { colorRolesTokens } from '@/themes/base/colorRoles.stylex';
import { typescaleTokens } from '@/themes/base/typo.stylex';
import { shapeTokens } from '@/themes/base/shape.stylex';

const vars = {
  // container
  containerColor: colorRolesTokens.surfaceContainer,
  containerShape: shapeTokens.corner$md,

  // crosshairs
  crosshairsColor: colorRolesTokens.surfaceContainerHighest,

  // labelText
  labelTextColor: colorRolesTokens.onSurface,
  labelTextFont: typescaleTokens.labelFont$sm,
  labelTextSize: typescaleTokens.labelSize$sm,
  labelTextLineHeight: typescaleTokens.labelLineHeight$sm,
  labelTextLetterSpacing: typescaleTokens.labelLetterSpacing$sm,
  labelTextWeight: typescaleTokens.labelWeight$sm,
};

export const placeholderTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const placeholderTheme = stylex.createTheme(placeholderTokens, vars);
