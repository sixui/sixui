import stylex from '@stylexjs/stylex';

import { typeScaleTokens } from '~/themes/base/typeScale.stylex';
import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { densityTokens } from '~/themes/base/density.stylex';
import { spacingTokens } from '~/themes/base/spacing.stylex';
import { scaleTokens } from '~/themes/base/scale.stylex';

const MIN_DENSITY = -1;
const MAX_DENSITY = 0;
const DENSITY = `${densityTokens.interval} * clamp(${MIN_DENSITY}, ${densityTokens.density}, ${MAX_DENSITY}) * ${scaleTokens.scale}`;

const vars = {
  gap: spacingTokens.padding$2,

  // item
  itemColor: colorSchemeTokens.onSurface,

  // separator
  separatorColor: colorSchemeTokens.onSurface,
  separatorSize: typeScaleTokens.bodySize$md,

  // expandButton
  expandButtonContainerShape: `calc(2px * ${scaleTokens.scale})`,
  expandButtonContainerColor: colorSchemeTokens.surfaceContainer,
  expandButtonContainerWidth: `calc(24px * ${scaleTokens.scale})`,
  expandButtonContainerHeight: `calc(16px * ${scaleTokens.scale} + ${DENSITY})`,
  expandButtonLeadingSpace: spacingTokens.padding$1,
  expandButtonTrailingSpace: spacingTokens.padding$1,
  expandButtonIconSize: `calc(18px * ${scaleTokens.scale})`,

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
