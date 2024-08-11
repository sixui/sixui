import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { densityTokens } from '~/themes/base/density.stylex';
import { scaleTokens } from '~/themes/base/scale.stylex';
import { spacingTokens } from '~/themes/base/spacing.stylex';
import { typeScaleTokens } from '~/themes/base/typeScale.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-item.scss

const MIN_DENSITY = -1;
const MAX_DENSITY = 0;
const DENSITY = `${densityTokens.interval} * clamp(${MIN_DENSITY}, ${densityTokens.density}, ${MAX_DENSITY}) * ${scaleTokens.scale}`;

const vars = {
  gap: spacingTokens.padding$3,

  // text
  textColor: colorSchemeTokens.onSurface,

  // nonText
  nonTextColor: colorSchemeTokens.onSurfaceVariant,

  // leadingContent
  leadingContentColor: 'inherit',

  // overline
  overlineColor: colorSchemeTokens.onSurfaceVariant,
  overlineFont: typeScaleTokens.labelFont$sm,
  overlineLineHeight: typeScaleTokens.labelLineHeight$sm,
  overlineSize: typeScaleTokens.labelSize$sm,
  overlineLetterSpacing: typeScaleTokens.labelLetterSpacing$sm,
  overlineWeight: typeScaleTokens.labelWeight$sm,

  // headlineText
  headlineTextColor: colorSchemeTokens.onSurface,
  headlineTextFont: typeScaleTokens.bodyFont$lg,
  headlineTextLineHeight: `calc(${typeScaleTokens.bodyLineHeight$lg} + ${DENSITY})`,
  headlineTextSize: typeScaleTokens.bodySize$lg,
  headlineTextLetterSpacing: typeScaleTokens.bodyLetterSpacing$lg,
  headlineTextWeight: typeScaleTokens.bodyWeight$lg,

  // supportingText
  supportingTextColor: colorSchemeTokens.onSurfaceVariant,
  supportingTextFont: typeScaleTokens.bodyFont$sm,
  supportingTextLineHeight: typeScaleTokens.bodyLineHeight$sm,
  supportingTextSize: typeScaleTokens.bodySize$sm,
  supportingTextLetterSpacing: typeScaleTokens.bodyLetterSpacing$sm,
  supportingTextWeight: typeScaleTokens.bodyWeight$sm,

  // trailingSupportingText
  trailingSupportingTextColor: colorSchemeTokens.onSurfaceVariant,
  trailingSupportingTextFont: typeScaleTokens.labelFont$sm,
  trailingSupportingTextLineHeight: typeScaleTokens.labelLineHeight$sm,
  trailingSupportingTextSize: typeScaleTokens.labelSize$sm,
  trailingSupportingTextLetterSpacing: typeScaleTokens.labelLetterSpacing$sm,
  trailingSupportingTextWeight: typeScaleTokens.labelWeight$sm,

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
