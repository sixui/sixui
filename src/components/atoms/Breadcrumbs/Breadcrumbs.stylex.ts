import stylex from '@stylexjs/stylex';

import { typescaleVars } from '@/themes/base/vars/typo.stylex';
import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';

const vars = {
  // item
  itemColor: colorRolesVars.onSurface,

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

export const breadcrumbsTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const breadscrumbsTheme = stylex.createTheme(breadcrumbsTokens, vars);
