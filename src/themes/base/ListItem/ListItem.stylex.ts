import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IListItemStyleVarKey } from '@/components/atoms/ListItem';
import { componentVars as itemComponentVars } from '../Item/Item.stylex';
import { colorRolesVars } from '../vars/colorRoles.stylex';
import { shapeVars } from '../vars/shape.stylex';
import { stateVars } from '../vars/state.stylex';
import { typescaleVars } from '../vars/typo.stylex';

// https://github.com/material-components/material-web/blob/main/tokens/_md-comp-list-item.scss
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-comp-list.scss
const vars: Partial<IStyleVars<IListItemStyleVarKey>> = {
  leadingSpace: '16px',
  trailingSpace: '16px',
  topSpace: '12px',
  bottomSpace: '12px',

  // container
  containerColor: 'transparent',
  containerShape: shapeVars.corner$none,
  containerHeight$oneLine: '48px',
  containerHeight$twoLine: '56px',
  containerHeight$threeLine: '72px',
  // &:disabled
  containerColor$disabled: 'transparent',
  containerOpacity$disabled: stateVars.containerOpacity$disabled,

  // selectedContainer
  selectedContainerColor: colorRolesVars.primaryContainer,

  // text
  textColor: colorRolesVars.onSurface,
  // &:disabled
  textColor$disabled: colorRolesVars.onSurface,
  textOpacity$disabled: stateVars.opacity$disabled,
  // &:focus
  textColor$focus: colorRolesVars.onSurface,
  // &:hover
  textColor$hover: colorRolesVars.onSurface,
  // &:pressed
  textColor$pressed: colorRolesVars.onSurface,

  // selectedText
  selectedTextColor: colorRolesVars.onPrimaryContainer,
  // &:focus
  selectedTextColor$focus: colorRolesVars.onPrimaryContainer,
  // &:hover
  selectedTextColor$hover: colorRolesVars.onPrimaryContainer,
  // &:pressed
  selectedTextColor$pressed: colorRolesVars.onPrimaryContainer,

  // nonText
  nonTextColor: colorRolesVars.onSurfaceVariant,
  // &:disabled
  nonTextColor$disabled: colorRolesVars.onSurfaceVariant,
  nonTextOpacity$disabled: stateVars.opacity$disabled,
  // &:focus
  nonTextColor$focus: colorRolesVars.onSurfaceVariant,
  // &:hover
  nonTextColor$hover: colorRolesVars.onSurfaceVariant,
  // &:pressed
  nonTextColor$pressed: colorRolesVars.onSurfaceVariant,

  // selectedNonText
  selectedNonTextColor: colorRolesVars.onPrimaryContainer,
  // &:focus
  selectedNonTextColor$focus: colorRolesVars.onPrimaryContainer,
  // &:hover
  selectedNonTextColor$hover: colorRolesVars.onPrimaryContainer,
  // &:pressed
  selectedNonTextColor$pressed: colorRolesVars.onPrimaryContainer,

  // stateLayer
  // &:hover
  stateLayerColor$hover: colorRolesVars.onSurface,
  stateLayerOpacity$hover: stateVars.stateLayerOpacity$hover,
  // &:pressed
  stateLayerColor$pressed: colorRolesVars.primary,
  stateLayerOpacity$pressed: stateVars.stateLayerOpacity$pressed,

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
  vars as IStyleVars<IListItemStyleVarKey>,
);

// This is a workaround to allow reaplying vars at the component level so that it can uses themed
// vars. See https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
export const componentTheme = stylex.createTheme(componentVars, vars);

export const itemComponentTheme = stylex.createTheme(itemComponentVars, vars);
