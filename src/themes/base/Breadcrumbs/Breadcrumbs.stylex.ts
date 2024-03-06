import stylex from '@stylexjs/stylex';

import type { IStyleVars } from '@/helpers/types';
import type { IBreadcrumbsStyleVarKey } from '@/components/atoms/Breadcrumbs';
import { typescaleVars } from '../vars/typo.stylex';
import { colorRolesVars } from '../vars/colorRoles.stylex';

const vars: Partial<IStyleVars<IBreadcrumbsStyleVarKey>> = {
  // item
  itemColor: colorRolesVars.onSurface,
  itemTextFont: typescaleVars.bodyFont$md,
  itemTextSize: typescaleVars.bodySize$md,
  itemTextWeight: typescaleVars.bodyWeight$md,
  itemTextLineHeight: typescaleVars.bodyLineHeight$md,
  itemTextLetterSpacing: typescaleVars.bodyLetterSpacing$md,

  // separator
  separatorColor: colorRolesVars.onSurface,
  separatorSize: typescaleVars.bodySize$md,

  // expandButton
  expandButtonContainerShape: '2px',
  expandButtonContainerColor: colorRolesVars.surfaceContainer,
  expandButtonContainerWidth: '24px',
  expandButtonContainerHeight: '16px',
  expandButtonLeadingSpace: '4px',
  expandButtonTrailingSpace: '4px',

  // expandButtonLabelText
  expandButtonLabelTextColor: colorRolesVars.onSurface,
  // &:hover
  expandButtonLabelTextColor$hover: colorRolesVars.onSurface,
  // &:focus
  expandButtonLabelTextColor$focus: colorRolesVars.onSurface,
  // &:pressed
  expandButtonLabelTextColor$pressed: colorRolesVars.onSurface,
};

export const componentVars = stylex.defineVars(
  vars as IStyleVars<IBreadcrumbsStyleVarKey>,
);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const componentTheme = stylex.createTheme(componentVars, vars);
