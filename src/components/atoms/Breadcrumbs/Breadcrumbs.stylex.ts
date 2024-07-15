import stylex from '@stylexjs/stylex';

import { typescaleTokens } from '@/themes/base/tokens/typo.stylex';
import { colorRolesTokens } from '@/themes/base/tokens/colorRoles.stylex';

const vars = {
  // item
  itemColor: colorRolesTokens.onSurface,

  // separator
  separatorColor: colorRolesTokens.onSurface,
  separatorSize: typescaleTokens.bodySize$md,

  // expandButton
  expandButtonContainerShape: '2px',
  expandButtonContainerColor: colorRolesTokens.surfaceContainer,
  expandButtonContainerWidth: '24px',
  expandButtonContainerHeight: '16px',
  expandButtonLeadingSpace: '4px',
  expandButtonTrailingSpace: '4px',

  // expandButtonLabelText
  expandButtonLabelTextColor: colorRolesTokens.onSurface,
  // &:hover
  expandButtonLabelTextColor$hover: colorRolesTokens.onSurface,
  // &:focus
  expandButtonLabelTextColor$focus: colorRolesTokens.onSurface,
  // &:pressed
  expandButtonLabelTextColor$pressed: colorRolesTokens.onSurface,
};

export const breadcrumbsTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const breadscrumbsTheme = stylex.createTheme(breadcrumbsTokens, vars);
