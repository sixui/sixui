import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IPlainTooltipContentStyleVarKey } from '@/components/atoms/PlainTooltipContent';
import { colorRolesVars } from '../vars/colorRoles.stylex';
import { shapeVars } from '../vars/shape.stylex';
import { typescaleVars } from '../vars/typo.stylex';

const vars: IStyleVars<IPlainTooltipContentStyleVarKey> = {
  topSpace: '8px',
  bottomSpace: '8px',
  leadingSpace: '8px',
  trailingSpace: '8px',

  // container
  containerColor: colorRolesVars.inverseSurface,
  containerShape: shapeVars.corner$xs,
  containerMaxWidth: '215px',
  containerMinHeight: '24px',

  // supportingText
  supportingTextColor: colorRolesVars.inverseOnSurface,
  supportingTextFont: typescaleVars.bodyFont$sm,
  supportingTextSize: typescaleVars.bodySize$sm,
  supportingTextWeight: typescaleVars.bodyWeight$sm,
  supportingTextLineHeight: typescaleVars.bodyLineHeight$sm,
  supportingTextLetterSpacing: typescaleVars.bodyLetterSpacing$sm,
};

export const componentVars = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const componentTheme = stylex.createTheme(componentVars, vars);
