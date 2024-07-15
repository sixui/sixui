import stylex from '@stylexjs/stylex';

import { colorRolesTokens } from '@/themes/base/tokens/colorRoles.stylex';
import { typescaleTokens } from '@/themes/base/tokens/typo.stylex';
import { shapeTokens } from '@/themes/base/tokens/shape.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-divider.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-divider.scss

const vars = {
  thickness: '1px',
  shape: shapeTokens.corner$none,
  color: colorRolesTokens.outlineVariant,

  // inset
  insetLeadingSpace: '16px',
  insetTrailingSpace: '16px',

  // text
  textLeadingSpace: '8px',
  textTrailingSpace: '8px',
  textColor: colorRolesTokens.outline,
  textFont: typescaleTokens.bodyFont$sm,
  textSize: typescaleTokens.bodySize$sm,
  textWeight: typescaleTokens.bodyWeight$sm,
  textLineHeight: typescaleTokens.bodyLineHeight$sm,
  textLetterSpacing: typescaleTokens.bodyLetterSpacing$sm,
};

export const dividerTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const dividerTheme = stylex.createTheme(dividerTokens, vars);
