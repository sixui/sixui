import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { tabTokens } from '../Tab.stylex';
import { densityTokens } from '~/themes/base/density.stylex';

const MIN_DENSITY_SCALE = -4;
const MAX_DENSITY_SCALE = 0;

// https://github.com/material-components/material-web/blob/main/tabs/internal/_primary-tab.scss

export const primaryTabStyles = stylex.create({
  host: {
    [tabTokens.activeIndicatorHeight]: '3px',
    [tabTokens.activeIndicatorShape]: '3px 3px 0 0',

    [tabTokens.activeStateLayerColor$hover]: colorSchemeTokens.primary,
    [tabTokens.activeStateLayerOpacity$hover]:
      tabTokens.stateLayerOpacity$hover,
    [tabTokens.activeStateLayerColor$pressed]: colorSchemeTokens.primary,
    [tabTokens.activeStateLayerOpacity$pressed]:
      tabTokens.stateLayerOpacity$pressed,

    [tabTokens.containerHeight$withIconAndLabelText]: `calc(64px + ${densityTokens.interval} * clamp(${densityTokens.scale}, ${MIN_DENSITY_SCALE}, ${MAX_DENSITY_SCALE}))`,

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
    gap: 2,
  },
  content$stacked$hasIcon$hasLabel: {
    height: tabTokens.containerHeight$withIconAndLabelText,
  },
});
