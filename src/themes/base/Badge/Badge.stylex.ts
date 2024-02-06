import * as stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IBadgeStyleVarKey } from '@/components/atoms/Badge';
import { colorRolesVars } from '../vars/colorRoles.stylex';
import { typescaleVars } from '../vars/typo.stylex';
import { shapeVars } from '../vars/shape.stylex';
import { stateVars } from '../vars/state.stylex';

const vars: Partial<IStyleVars<IBadgeStyleVarKey>> = {
  // container
  containerColor: colorRolesVars.error,
  containerShape: shapeVars.corner$full,
  containerShape$dot: shapeVars.corner$full,
  containerMinWidth: '16px',
  containerHeight: '16px',
  containerWidth$dot: '8px',
  containerHeight$dot: '8px',
  containerPadding: '4px',
  // &:disabled
  containerColor$disabled: colorRolesVars.onSurface,
  containerOpacity$disabled: stateVars.containerOpacity$disabled,

  // label
  labelTextColor: colorRolesVars.onError,
  labelTextFont: typescaleVars.labelFont$sm,
  labelTextLineHeight: typescaleVars.labelLineHeight$sm,
  labelTextSize: typescaleVars.labelSize$sm,
  labelTextLetterSpacing: typescaleVars.labelLetterSpacing$sm,
  labelTextWeight: typescaleVars.labelWeight$sm,
  // &:disabled
  labelTextColor$disabled: colorRolesVars.onSurface,
  labelTextOpacity$disabled: stateVars.opacity$disabled,
};

export const componentVars = stylex.defineVars(
  vars as IStyleVars<IBadgeStyleVarKey>,
);

// This is a workaround to allow reaplying vars at the component level so that it can uses themed
// vars. See https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
export const componentTheme = stylex.createTheme(componentVars, vars);
