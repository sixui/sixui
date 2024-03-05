import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IAvatarStyleVarKey } from '@/components/atoms/Avatar';
import { colorRolesVars } from '../vars/colorRoles.stylex';
import { typescaleVars } from '../vars/typo.stylex';
import { shapeVars } from '../vars/shape.stylex';

const vars: Partial<IStyleVars<IAvatarStyleVarKey>> = {
  // container
  containerShape: shapeVars.corner$full,
  containerWidth: '40px',
  containerHeight: '40px',
  containerColor: colorRolesVars.secondaryContainer,

  // label
  labelTextColor: colorRolesVars.onSecondaryContainer,
  labelTextFont: typescaleVars.bodyFont$lg,
  labelTextLineHeight: typescaleVars.bodyLineHeight$lg,
  labelTextSize: typescaleVars.bodySize$lg,
  labelTextLetterSpacing: typescaleVars.bodyLetterSpacing$lg,
  labelTextWeight: typescaleVars.bodyWeight$lg,
};

export const componentVars = stylex.defineVars(
  vars as IStyleVars<IAvatarStyleVarKey>,
);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const componentTheme = stylex.createTheme(componentVars, vars);
