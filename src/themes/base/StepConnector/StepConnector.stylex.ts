import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IStepConnectorStyleVarKey } from '@/components/atoms/StepConnector';
import { colorRolesVars } from '../vars/colorRoles.stylex';
import { typescaleVars } from '../vars/typo.stylex';
import { shapeVars } from '../vars/shape.stylex';

const vars: Partial<IStyleVars<IStepConnectorStyleVarKey>> = {
  thickness: '1px',
  shape: shapeVars.corner$full,
  color: colorRolesVars.outlineVariant,
  minLength$horizontal: '12px',
  minLength$vertical: '24px',
  // &:completed
  color$completed: colorRolesVars.primary,

  // text
  textSpace$horizontal: '8px',
  textSpace$vertical: '4px',
  textColor: colorRolesVars.outline,
  textFont: typescaleVars.bodyFont$sm,
  textSize: typescaleVars.bodySize$sm,
  textWeight: typescaleVars.bodyWeight$sm,
  textLineHeight: typescaleVars.bodyLineHeight$sm,
  textLetterSpacing: typescaleVars.bodyLetterSpacing$sm,
  // &:completed
  textColor$completed: colorRolesVars.primary,
};

export const componentVars = stylex.defineVars(
  vars as IStyleVars<IStepConnectorStyleVarKey>,
);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const componentTheme = stylex.createTheme(componentVars, vars);
