import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { scaleTokens } from '~/themes/base/scale.stylex';
import { shapeTokens } from '~/themes/base/shape.stylex';
import { spacingTokens } from '~/themes/base/spacing.stylex';
import { typeScaleTokens } from '~/themes/base/typeScale.stylex';

const vars = {
  topSpace: spacingTokens.padding$2,
  bottomSpace: spacingTokens.padding$2,
  leadingSpace: spacingTokens.padding$2,
  trailingSpace: spacingTokens.padding$2,

  // container
  containerColor: colorSchemeTokens.inverseSurface,
  containerShape: shapeTokens.corner$xs,
  containerMaxWidth: `calc(215px * ${scaleTokens.scale})`,
  containerMinHeight: `calc(24px * ${scaleTokens.scale})`,

  // supportingText
  supportingTextColor: colorSchemeTokens.inverseOnSurface,
  supportingTextFont: typeScaleTokens.bodyFont$sm,
  supportingTextSize: typeScaleTokens.bodySize$sm,
  supportingTextWeight: typeScaleTokens.bodyWeight$sm,
  supportingTextLineHeight: typeScaleTokens.bodyLineHeight$sm,
  supportingTextLetterSpacing: typeScaleTokens.bodyLetterSpacing$sm,
};

export const plainTooltipContentTokens = stylex.defineVars(vars);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const plainTooltipContentTheme = stylex.createTheme(
  plainTooltipContentTokens,
  vars,
);
