import stylex from '@stylexjs/stylex';

import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { typescaleVars } from '@/themes/base/vars/typo.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-item.scss

const vars = {
  gap: '12px',

  // text
  textColor: colorRolesVars.onSurface,

  // nonText
  nonTextColor: colorRolesVars.onSurfaceVariant,

  // leadingContent
  leadingContentColor: 'inherit',

  // overline
  overlineColor: colorRolesVars.onSurfaceVariant,
  overlineFont: typescaleVars.labelFont$sm,
  overlineLineHeight: typescaleVars.labelLineHeight$sm,
  overlineSize: typescaleVars.labelSize$sm,
  overlineLetterSpacing: typescaleVars.labelLetterSpacing$sm,
  overlineWeight: typescaleVars.labelWeight$sm,

  // headlineText
  headlineTextColor: colorRolesVars.onSurface,
  headlineTextFont: typescaleVars.bodyFont$lg,
  headlineTextLineHeight: typescaleVars.bodyLineHeight$lg,
  headlineTextSize: typescaleVars.bodySize$lg,
  headlineTextLetterSpacing: typescaleVars.bodyLetterSpacing$lg,
  headlineTextWeight: typescaleVars.bodyWeight$lg,

  // supportingText
  supportingTextColor: colorRolesVars.onSurfaceVariant,
  supportingTextFont: typescaleVars.bodyFont$sm,
  supportingTextLineHeight: typescaleVars.bodyLineHeight$sm,
  supportingTextSize: typescaleVars.bodySize$sm,
  supportingTextLetterSpacing: typescaleVars.bodyLetterSpacing$sm,
  supportingTextWeight: typescaleVars.bodyWeight$sm,

  // trailingSupportingText
  trailingSupportingTextColor: colorRolesVars.onSurfaceVariant,
  trailingSupportingTextFont: typescaleVars.labelFont$sm,
  trailingSupportingTextLineHeight: typescaleVars.labelLineHeight$sm,
  trailingSupportingTextSize: typescaleVars.labelSize$sm,
  trailingSupportingTextLetterSpacing: typescaleVars.labelLetterSpacing$sm,
  trailingSupportingTextWeight: typescaleVars.labelWeight$sm,

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
