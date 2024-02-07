import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IItemStyleVarKey } from '@/components/atoms/Item';
import { colorRolesVars } from '../vars/colorRoles.stylex';
import { typescaleVars } from '../vars/typo.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-item.scss
const vars: Partial<IStyleVars<IItemStyleVarKey>> = {
  // listItemLabelText
  labelTextColor: colorRolesVars.onSurface,
  labelTextFont: typescaleVars.bodyFont$lg,
  labelTextLineHeight: typescaleVars.bodyLineHeight$lg,
  labelTextSize: typescaleVars.bodySize$lg,
  labelTextLetterSpacing: typescaleVars.bodyLetterSpacing$lg,
  labelTextWeight: typescaleVars.bodyWeight$lg,

  // overline
  overlineColor: colorRolesVars.onSurfaceVariant,
  overlineFont: typescaleVars.labelFont$sm,
  overlineLineHeight: typescaleVars.labelLineHeight$sm,
  overlineSize: typescaleVars.labelSize$sm,
  overlineLetterSpacing: typescaleVars.labelLetterSpacing$sm,
  overlineWeight: typescaleVars.labelWeight$sm,

  // supportingText
  supportingTextColor: colorRolesVars.onSurfaceVariant,
  supportingTextFont: typescaleVars.bodyFont$md,
  supportingTextLineHeight: typescaleVars.bodyLineHeight$md,
  supportingTextSize: typescaleVars.bodySize$md,
  supportingTextLetterSpacing: typescaleVars.bodyLetterSpacing$md,
  supportingTextWeight: typescaleVars.bodyWeight$md,

  // trailingSupportingText
  trailingSupportingTextColor: colorRolesVars.onSurfaceVariant,
  trailingSupportingTextFont: typescaleVars.labelFont$sm,
  trailingSupportingTextLineHeight: typescaleVars.labelLineHeight$sm,
  trailingSupportingTextSize: typescaleVars.labelSize$sm,
  trailingSupportingTextLetterSpacing: typescaleVars.labelLetterSpacing$sm,
  trailingSupportingTextWeight: typescaleVars.labelWeight$sm,
};

export const componentVars = stylex.defineVars(
  vars as IStyleVars<IItemStyleVarKey>,
);

// This is a workaround to allow reaplying vars at the component level so that it can uses themed
// vars. See https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
export const componentTheme = stylex.createTheme(componentVars, vars);
