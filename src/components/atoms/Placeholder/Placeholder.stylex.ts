import stylex from '@stylexjs/stylex';

import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { typescaleVars } from '@/themes/base/vars/typo.stylex';
import { shapeVars } from '@/themes/base/vars/shape.stylex';

const vars = {
  // container
  containerColor: colorRolesVars.surfaceContainer,
  containerShape: shapeVars.corner$md,

  // crosshairs
  crosshairsColor: colorRolesVars.surfaceContainerHighest,

  // labelText
  labelTextColor: colorRolesVars.onSurface,
  labelTextFont: typescaleVars.labelFont$sm,
  labelTextSize: typescaleVars.labelSize$sm,
  labelTextLineHeight: typescaleVars.labelLineHeight$sm,
  labelTextLetterSpacing: typescaleVars.labelLetterSpacing$sm,
  labelTextWeight: typescaleVars.labelWeight$sm,
};

export const placeholderTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const placeholderTheme = stylex.createTheme(placeholderTokens, vars);
