import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { elevationTokens } from '~/components/Elevation/Elevation.stylex';
import { shapeTokens } from '~/themes/base/shape.stylex';
import { scaleTokens } from '~/themes/base/scale.stylex';
import { typeScaleTokens } from '~/themes/base/typeScale.stylex';
import { spacingTokens } from '~/themes/base/spacing.stylex';

const vars = {
  leadingSpace: spacingTokens.padding$6,
  leadingSpace$withIcon: spacingTokens.padding$6,
  trailingSpace: spacingTokens.padding$6,
  topSpace: spacingTokens.padding$4,

  // container
  containerColor: colorSchemeTokens.surface,
  containerElevation: elevationTokens.boxShadow$level0,
  containerShape$topLeft: shapeTokens.corner$none,
  containerShape$topRight: shapeTokens.corner$none,
  containerShape$bottomLeft: shapeTokens.corner$none,
  containerShape$bottomRight: shapeTokens.corner$none,

  // headline
  headlineColor: colorSchemeTokens.onSurfaceVariant,
  headlineFont: typeScaleTokens.titleFont$lg,
  headlineLineHeight: typeScaleTokens.titleLineHeight$lg,
  headlineSize: typeScaleTokens.titleSize$lg,
  headlineLetterSpacing: typeScaleTokens.titleLetterSpacing$lg,
  headlineWeight: typeScaleTokens.titleWeight$lg,

  // divider
  dividerColor: colorSchemeTokens.outline,

  // topElements
  topElementsGap: spacingTokens.padding$3,

  // bottomActions
  bottomActionsHeight: `calc(72px * ${scaleTokens.scale})`,
  bottomActionsTopSpace: spacingTokens.padding$4,
  bottomActionsBottomSpace: spacingTokens.padding$6,
  bottomActionsGap: spacingTokens.padding$6,
};

export const sideSheetContentTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const sideSheetContentTheme = stylex.createTheme(
  sideSheetContentTokens,
  vars,
);
