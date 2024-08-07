import stylex from '@stylexjs/stylex';

import { typeScaleTokens } from '~/themes/base/typeScale.stylex';
import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { spacingTokens } from '~/themes/base/spacing.stylex';

const vars = {
  // item
  itemColor: colorSchemeTokens.onSurface,

  // separator
  separatorColor: colorSchemeTokens.onSurface,
  separatorSize: typeScaleTokens.bodySize$md,

  // expandButton
  expandButtonContainerShape: '2px',
  expandButtonContainerColor: colorSchemeTokens.surfaceContainer,
  expandButtonContainerWidth: '24px',
  expandButtonContainerHeight: '16px',
  expandButtonLeadingSpace: spacingTokens.padding$1,
  expandButtonTrailingSpace: spacingTokens.padding$1,
  expandButtonIconSize: '18px',

  // expandButtonLabelText
  expandButtonLabelTextColor: colorSchemeTokens.onSurface,
  // &:hover
  expandButtonLabelTextColor$hover: colorSchemeTokens.onSurface,
  // &:focus
  expandButtonLabelTextColor$focus: colorSchemeTokens.onSurface,
  // &:pressed
  expandButtonLabelTextColor$pressed: colorSchemeTokens.onSurface,
};

export const breadcrumbsTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const breadscrumbsTheme = stylex.createTheme(breadcrumbsTokens, vars);
