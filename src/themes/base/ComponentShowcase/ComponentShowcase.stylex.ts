import * as stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IComponentShowcaseStyleVarKey } from '@/components/molecules/ComponentShowcase';
import { typescaleVars } from '@/themes/base/vars/typo.stylex';
import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';

const vars: Partial<IStyleVars<IComponentShowcaseStyleVarKey>> = {
  textColor: colorRolesVars.onSurface,

  // legend
  legendTextColor: colorRolesVars.onSurface,
  legendTextFont: typescaleVars.labelFont$md,
  legendTextLineHeight: typescaleVars.labelLineHeight$md,
  legendTextSize: typescaleVars.labelSize$md,
  legendTextTracking: typescaleVars.labelTracking$md,
  legendTextWeight: typescaleVars.labelWeight$md,

  // groupBorder
  groupBorderColor: colorRolesVars.onSurface,
};

export const componentVars = stylex.defineVars(
  vars as IStyleVars<IComponentShowcaseStyleVarKey>,
);

// This is a workaround to allow reaplying vars at the component level so that it can uses themed
// vars. See https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
export const componentTheme = stylex.createTheme(componentVars, vars);
