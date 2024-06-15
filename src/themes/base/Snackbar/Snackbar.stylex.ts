import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { ISnackbarStyleVarKey } from '@/components/atoms/Snackbar';
import { colorRolesVars } from '../vars/colorRoles.stylex';
import { componentVars as elevationVars } from '../Elevation/Elevation.stylex';
import { shapeVars } from '../vars/shape.stylex';
import { typescaleVars } from '../vars/typo.stylex';

const vars: Partial<IStyleVars<ISnackbarStyleVarKey>> = {
  gap: '12px',
  topSpace: '14px',
  bottomSpace: '14px',
  leadingSpace: '16px',
  trailingSpace: '16px',
  actionTrailingSpace: '8px',
  iconTrailingSpace: '12px',

  // container
  containerColor: colorRolesVars.onSurface,
  containerElevation: elevationVars.boxShadow$level3,
  containerShape: shapeVars.corner$xs,
  containerMinHeight: '48px',

  // supportingText
  supportingTextColor: colorRolesVars.inverseOnSurface,
  supportingTextFont: typescaleVars.bodyFont$md,
  supportingTextSize: typescaleVars.bodySize$md,
  supportingTextWeight: typescaleVars.bodyWeight$md,
  supportingTextLineHeight: typescaleVars.bodyLineHeight$md,
  supportingTextLetterSpacing: typescaleVars.bodyLetterSpacing$md,
};

export const componentVars = stylex.defineVars(
  vars as IStyleVars<ISnackbarStyleVarKey>,
);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const componentTheme = stylex.createTheme(componentVars, vars);
