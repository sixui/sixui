import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IItemStyleVarKey } from '@/components/atoms/Item';
import { colorRolesVars } from '../vars/colorRoles.stylex';
import { typescaleVars } from '../vars/typo.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-item.scss

const vars: Partial<IStyleVars<IItemStyleVarKey>> = {
  // text
  textColor: colorRolesVars.onSurface,

  // nonText
  nonTextColor: colorRolesVars.onSurfaceVariant,

  // start
  startColor: 'inherit',

  // overline
  overlineColor: 'inherit',
  overlineFont: typescaleVars.labelFont$sm,
  overlineLineHeight: typescaleVars.labelLineHeight$sm,
  overlineSize: typescaleVars.labelSize$sm,
  overlineLetterSpacing: typescaleVars.labelLetterSpacing$sm,
  overlineWeight: typescaleVars.labelWeight$sm,

  // labelText
  labelTextColor: 'inherit',
  labelTextFont: typescaleVars.bodyFont$md,
  labelTextLineHeight: typescaleVars.bodyLineHeight$md,
  labelTextSize: typescaleVars.bodySize$md,
  labelTextLetterSpacing: typescaleVars.bodyLetterSpacing$md,
  labelTextWeight: typescaleVars.bodyWeight$md,

  // headline
  headlineColor: 'inherit',
  headlineFont: typescaleVars.labelFont$sm,
  headlineLineHeight: typescaleVars.labelLineHeight$sm,
  headlineSize: typescaleVars.labelSize$sm,
  headlineLetterSpacing: typescaleVars.labelLetterSpacing$sm,
  headlineWeight: typescaleVars.labelWeight$sm,

  // supportingText
  supportingTextColor: 'inherit',
  supportingTextFont: typescaleVars.bodyFont$sm,
  supportingTextLineHeight: typescaleVars.bodyLineHeight$sm,
  supportingTextSize: typescaleVars.bodySize$sm,
  supportingTextLetterSpacing: typescaleVars.bodyLetterSpacing$sm,
  supportingTextWeight: typescaleVars.bodyWeight$sm,

  // trailingSupportingText
  trailingSupportingTextColor: 'inherit',
  trailingSupportingTextFont: typescaleVars.labelFont$sm,
  trailingSupportingTextLineHeight: typescaleVars.labelLineHeight$sm,
  trailingSupportingTextSize: typescaleVars.labelSize$sm,
  trailingSupportingTextLetterSpacing: typescaleVars.labelLetterSpacing$sm,
  trailingSupportingTextWeight: typescaleVars.labelWeight$sm,

  // end
  endColor: 'inherit',
};

export const componentVars = stylex.defineVars(
  vars as IStyleVars<IItemStyleVarKey>,
);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const componentTheme = stylex.createTheme(componentVars, vars);
