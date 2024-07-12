import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IOptionCardStyleVarKey } from '@/components/atoms/OptionCard';
import { colorRolesVars } from '../vars/colorRoles.stylex';
import { typescaleVars } from '../vars/typo.stylex';
import { stateVars } from '../vars/state.stylex';

const vars: IStyleVars<IOptionCardStyleVarKey> = {
  // selectedOutline
  selectedOutlineColor: colorRolesVars.primary,
  selectedOutlineWidth: '2px',
  // &:disabled
  selectedOutlineColor$disabled: colorRolesVars.outline,
  selectedOutlineOpacity$disabled: stateVars.containerOpacity$disabled,
  // &:focus
  selectedOutlineColor$focus: colorRolesVars.primary,
  // &:hover
  selectedOutlineColor$hover: colorRolesVars.primary,
  // &:pressed
  selectedOutlineColor$pressed: colorRolesVars.primary,
  selectedOutlineColor$dragged: colorRolesVars.primary,

  // text
  textColor: colorRolesVars.onSurface,
  textFont: typescaleVars.bodyFont$md,
  textSize: typescaleVars.bodySize$md,
  textLineHeight: typescaleVars.bodyLineHeight$md,
  textLetterSpacing: typescaleVars.bodyLetterSpacing$md,
  textWeight: typescaleVars.bodyWeight$md,
  // &:disabled
  textColor$disabled: colorRolesVars.onSurface,
  textOpacity$disabled: stateVars.opacity$disabled,
};

export const componentVars = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const componentTheme = stylex.createTheme(componentVars, vars);
