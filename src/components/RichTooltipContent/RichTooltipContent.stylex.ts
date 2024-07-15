import stylex from '@stylexjs/stylex';

import { colorRolesTokens } from '@/themes/base/colorRoles.stylex';
import { shapeTokens } from '@/themes/base/shape.stylex';
import { elevationTokens } from '@/components/Elevation/Elevation.stylex';
import { typescaleTokens } from '@/themes/base/typo.stylex';

const vars = {
  topSpace: '12px',
  bottomSpace: '12px',
  actionsBottomSpace: '8px',
  leadingSpace: '16px',
  trailingSpace: '16px',
  gap: '4px',

  // container
  containerColor: colorRolesTokens.surfaceContainer,
  containerElevation: elevationTokens.boxShadow$level2,
  containerShape: shapeTokens.corner$md,
  containerMaxWidth: '315px',

  // subhead
  subheadColor: colorRolesTokens.onSurfaceVariant,
  subheadFont: typescaleTokens.titleFont$sm,
  subheadSize: typescaleTokens.titleSize$sm,
  subheadWeight: typescaleTokens.titleWeight$sm,
  subheadLineHeight: typescaleTokens.titleLineHeight$sm,
  subheadLetterSpacing: typescaleTokens.titleLetterSpacing$sm,

  // supportingText
  supportingTextColor: colorRolesTokens.onSurfaceVariant,
  supportingTextFont: typescaleTokens.bodyFont$md,
  supportingTextSize: typescaleTokens.bodySize$md,
  supportingTextWeight: typescaleTokens.bodyWeight$md,
  supportingTextLineHeight: typescaleTokens.bodyLineHeight$md,
  supportingTextLetterSpacing: typescaleTokens.bodyLetterSpacing$md,
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
