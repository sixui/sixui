import stylex from '@stylexjs/stylex';

import { colorRolesTokens } from '@/themes/base/colorRoles.stylex';
import { typescaleTokens } from '@/themes/base/typo.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-item.scss

const vars = {
  gap: '12px',

  // text
  textColor: colorRolesTokens.onSurface,

  // nonText
  nonTextColor: colorRolesTokens.onSurfaceVariant,

  // leadingContent
  leadingContentColor: 'inherit',

  // overline
  overlineColor: colorRolesTokens.onSurfaceVariant,
  overlineFont: typescaleTokens.labelFont$sm,
  overlineLineHeight: typescaleTokens.labelLineHeight$sm,
  overlineSize: typescaleTokens.labelSize$sm,
  overlineLetterSpacing: typescaleTokens.labelLetterSpacing$sm,
  overlineWeight: typescaleTokens.labelWeight$sm,

  // headlineText
  headlineTextColor: colorRolesTokens.onSurface,
  headlineTextFont: typescaleTokens.bodyFont$lg,
  headlineTextLineHeight: typescaleTokens.bodyLineHeight$lg,
  headlineTextSize: typescaleTokens.bodySize$lg,
  headlineTextLetterSpacing: typescaleTokens.bodyLetterSpacing$lg,
  headlineTextWeight: typescaleTokens.bodyWeight$lg,

  // supportingText
  supportingTextColor: colorRolesTokens.onSurfaceVariant,
  supportingTextFont: typescaleTokens.bodyFont$sm,
  supportingTextLineHeight: typescaleTokens.bodyLineHeight$sm,
  supportingTextSize: typescaleTokens.bodySize$sm,
  supportingTextLetterSpacing: typescaleTokens.bodyLetterSpacing$sm,
  supportingTextWeight: typescaleTokens.bodyWeight$sm,

  // trailingSupportingText
  trailingSupportingTextColor: colorRolesTokens.onSurfaceVariant,
  trailingSupportingTextFont: typescaleTokens.labelFont$sm,
  trailingSupportingTextLineHeight: typescaleTokens.labelLineHeight$sm,
  trailingSupportingTextSize: typescaleTokens.labelSize$sm,
  trailingSupportingTextLetterSpacing: typescaleTokens.labelLetterSpacing$sm,
  trailingSupportingTextWeight: typescaleTokens.labelWeight$sm,

  // trailingContent
  trailingContentColor: 'inherit',
};

export const itemTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const itemTheme = stylex.createTheme(itemTokens, vars);
