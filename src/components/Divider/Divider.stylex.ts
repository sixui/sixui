import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { typeScaleTokens } from '~/themes/base/typeScale.stylex';
import { shapeTokens } from '~/themes/base/shape.stylex';
import { outlineTokens } from '~/themes/base/outline.stylex';
import { spacingTokens } from '~/themes/base/spacing.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-divider.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-divider.scss

const vars = {
  thickness: outlineTokens.width$xs,
  shape: shapeTokens.corner$none,
  color: colorSchemeTokens.outlineVariant,

  // inset
  insetLeadingSpace: spacingTokens.padding$4,
  insetTrailingSpace: spacingTokens.padding$4,

  // text
  textLeadingSpace: spacingTokens.padding$2,
  textTrailingSpace: spacingTokens.padding$2,
  textColor: colorSchemeTokens.outline,
  textFont: typeScaleTokens.bodyFont$sm,
  textSize: typeScaleTokens.bodySize$sm,
  textWeight: typeScaleTokens.bodyWeight$sm,
  textLineHeight: typeScaleTokens.bodyLineHeight$sm,
  textLetterSpacing: typeScaleTokens.bodyLetterSpacing$sm,
};

export const dividerTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const dividerTheme = stylex.createTheme(dividerTokens, vars);
