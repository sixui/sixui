import stylex from '@stylexjs/stylex';

import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { typescaleVars } from '@/themes/base/vars/typo.stylex';
import { shapeVars } from '@/themes/base/vars/shape.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-divider.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-divider.scss

const vars = {
  thickness: '1px',
  shape: shapeVars.corner$none,
  color: colorRolesVars.outlineVariant,

  // inset
  insetLeadingSpace: '16px',
  insetTrailingSpace: '16px',

  // text
  textLeadingSpace: '8px',
  textTrailingSpace: '8px',
  textColor: colorRolesVars.outline,
  textFont: typescaleVars.bodyFont$sm,
  textSize: typescaleVars.bodySize$sm,
  textWeight: typescaleVars.bodyWeight$sm,
  textLineHeight: typescaleVars.bodyLineHeight$sm,
  textLetterSpacing: typescaleVars.bodyLetterSpacing$sm,
};

export const dividerTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const dividerTheme = stylex.createTheme(dividerTokens, vars);
