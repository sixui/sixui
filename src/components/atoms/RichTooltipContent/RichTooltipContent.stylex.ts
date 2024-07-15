import stylex from '@stylexjs/stylex';

import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { shapeVars } from '@/themes/base/vars/shape.stylex';
import { componentVars as elevationVars } from '@/themes/base/Elevation/Elevation.stylex';
import { typescaleVars } from '@/themes/base/vars/typo.stylex';

const vars = {
  topSpace: '12px',
  bottomSpace: '12px',
  actionsBottomSpace: '8px',
  leadingSpace: '16px',
  trailingSpace: '16px',
  gap: '4px',

  // container
  containerColor: colorRolesVars.surfaceContainer,
  containerElevation: elevationVars.boxShadow$level2,
  containerShape: shapeVars.corner$md,
  containerMaxWidth: '315px',

  // subhead
  subheadColor: colorRolesVars.onSurfaceVariant,
  subheadFont: typescaleVars.titleFont$sm,
  subheadSize: typescaleVars.titleSize$sm,
  subheadWeight: typescaleVars.titleWeight$sm,
  subheadLineHeight: typescaleVars.titleLineHeight$sm,
  subheadLetterSpacing: typescaleVars.titleLetterSpacing$sm,

  // supportingText
  supportingTextColor: colorRolesVars.onSurfaceVariant,
  supportingTextFont: typescaleVars.bodyFont$md,
  supportingTextSize: typescaleVars.bodySize$md,
  supportingTextWeight: typescaleVars.bodyWeight$md,
  supportingTextLineHeight: typescaleVars.bodyLineHeight$md,
  supportingTextLetterSpacing: typescaleVars.bodyLetterSpacing$md,
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
