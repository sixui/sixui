import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { shapeTokens } from '~/themes/base/shape.stylex';
import { typeScaleTokens } from '~/themes/base/typeScale.stylex';
import { spacingTokens } from '~/themes/base/spacing.stylex';
import { scaleTokens } from '~/themes/base/scale.stylex';
import { elevationTokens } from '../Elevation/Elevation.stylex';

const vars = {
  topSpace: spacingTokens.padding$3,
  bottomSpace: spacingTokens.padding$3,
  actionsBottomSpace: spacingTokens.padding$2,
  leadingSpace: spacingTokens.padding$4,
  trailingSpace: spacingTokens.padding$4,

  // container
  containerColor: colorSchemeTokens.surfaceContainer,
  containerElevation: elevationTokens.boxShadow$level2,
  containerShape: shapeTokens.corner$md,
  containerMaxWidth: `calc(315px * ${scaleTokens.scale})`,

  // subhead
  subheadColor: colorSchemeTokens.onSurfaceVariant,
  subheadFont: typeScaleTokens.titleFont$sm,
  subheadSize: typeScaleTokens.titleSize$sm,
  subheadWeight: typeScaleTokens.titleWeight$sm,
  subheadLineHeight: typeScaleTokens.titleLineHeight$sm,
  subheadLetterSpacing: typeScaleTokens.titleLetterSpacing$sm,

  // supportingText
  supportingTextColor: colorSchemeTokens.onSurfaceVariant,
  supportingTextFont: typeScaleTokens.bodyFont$md,
  supportingTextSize: typeScaleTokens.bodySize$md,
  supportingTextWeight: typeScaleTokens.bodyWeight$md,
  supportingTextLineHeight: typeScaleTokens.bodyLineHeight$md,
  supportingTextLetterSpacing: typeScaleTokens.bodyLetterSpacing$md,
};

export const richTooltipContentTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const richTooltipContentTheme = stylex.createTheme(
  richTooltipContentTokens,
  vars,
);
