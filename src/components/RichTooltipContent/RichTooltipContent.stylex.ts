import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '@/themes/base/colorScheme.stylex';
import { shapeTokens } from '@/themes/base/shape.stylex';
import { elevationTokens } from '@/components/Elevation/Elevation.stylex';
import { typeScaleTokens } from '@/themes/base/typeScale.stylex';

const vars = {
  topSpace: '12px',
  bottomSpace: '12px',
  actionsBottomSpace: '8px',
  leadingSpace: '16px',
  trailingSpace: '16px',
  gap: '4px',

  // container
  containerColor: colorSchemeTokens.surfaceContainer,
  containerElevation: elevationTokens.boxShadow$level2,
  containerShape: shapeTokens.corner$md,
  containerMaxWidth: '315px',

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
