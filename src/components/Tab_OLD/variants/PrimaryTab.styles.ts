import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { densityTokens } from '~/themes/base/density.stylex';
import { outlineTokens } from '~/themes/base/outline.stylex';
import { scaleTokens } from '~/themes/base/scale.stylex';
import { spacingTokens } from '~/themes/base/spacing.stylex';
import { tabTokens } from '../Tab.stylex';

const MIN_DENSITY = -4;
const MAX_DENSITY = 0;
const DENSITY = `${densityTokens.interval} * clamp(${MIN_DENSITY}, ${densityTokens.density}, ${MAX_DENSITY}) * ${scaleTokens.scale}`;

// https://github.com/material-components/material-web/blob/main/tabs/internal/_primary-tab.scss

export const primaryTabStyles = stylex.create({
  host: {
    [tabTokens.activeIndicatorHeight]: outlineTokens.width$md,
    [tabTokens.activeIndicatorShape]: `calc(3px * ${scaleTokens.scale}) calc(3px * ${scaleTokens.scale}) 0 0`,

    [tabTokens.activeStateLayerColor$hover]: colorSchemeTokens.primary,
    [tabTokens.activeStateLayerOpacity$hover]:
      tabTokens.stateLayerOpacity$hover,
    [tabTokens.activeStateLayerColor$pressed]: colorSchemeTokens.primary,
    [tabTokens.activeStateLayerOpacity$pressed]:
      tabTokens.stateLayerOpacity$pressed,

    [tabTokens.containerHeight$withIconAndLabelText]: `calc(64px * ${scaleTokens.scale} + ${DENSITY})`,

    [tabTokens.activeIconColor]: colorSchemeTokens.primary,
    [tabTokens.activeIconColor$focus]: colorSchemeTokens.primary,
    [tabTokens.activeIconColor$hover]: colorSchemeTokens.primary,
    [tabTokens.activeIconColor$pressed]: colorSchemeTokens.primary,

    [tabTokens.activeLabelTextColor]: colorSchemeTokens.primary,
    [tabTokens.activeLabelTextColor$focus]: colorSchemeTokens.primary,
    [tabTokens.activeLabelTextColor$hover]: colorSchemeTokens.primary,
    [tabTokens.activeLabelTextColor$pressed]: colorSchemeTokens.primary,
  },
  content$stacked: {
    flexDirection: 'column',
    gap: spacingTokens.padding$1,
  },
  content$stacked$hasIcon$hasLabel: {
    height: tabTokens.containerHeight$withIconAndLabelText,
  },
});
