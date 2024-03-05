import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { ICardHeaderStyleVarKey } from '@/components/atoms/CardHeader';
import { componentVars as itemComponentVars } from '../Item/Item.stylex';
import { colorRolesVars } from '../vars/colorRoles.stylex';
import { typescaleVars } from '../vars/typo.stylex';

const vars: Partial<IStyleVars<ICardHeaderStyleVarKey>> = {
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
  labelTextFont: typescaleVars.titleFont$md,
  labelTextLineHeight: typescaleVars.titleLineHeight$md,
  labelTextSize: typescaleVars.titleSize$md,
  labelTextLetterSpacing: typescaleVars.titleLetterSpacing$md,
  labelTextWeight: typescaleVars.titleWeight$md,

  // headline
  headlineColor: colorRolesVars.onSurfaceVariant,
  headlineFont: typescaleVars.bodyFont$md,
  headlineLineHeight: typescaleVars.bodyLineHeight$md,
  headlineSize: typescaleVars.bodySize$md,
  headlineLetterSpacing: typescaleVars.bodyLetterSpacing$md,
  headlineWeight: typescaleVars.bodyWeight$md,

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

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const componentTheme = stylex.createTheme(itemComponentVars, vars);
