import stylex from '@stylexjs/stylex';

import { colorRolesTokens } from '@/themes/base/colorRoles.stylex';
import { tabTokens } from '../Tab.stylex';

// https://github.com/material-components/material-web/blob/main/tabs/internal/_primary-tab.scss

export const primaryTabStyles = stylex.create({
  host: {
    [tabTokens.activeIndicatorHeight]: '3px',
    [tabTokens.activeIndicatorShape]: '3px 3px 0 0',

    [tabTokens.activeStateLayerColor$hover]: colorRolesTokens.primary,
    [tabTokens.activeStateLayerOpacity$hover]:
      tabTokens.stateLayerOpacity$hover,
    [tabTokens.activeStateLayerColor$pressed]: colorRolesTokens.primary,
    [tabTokens.activeStateLayerOpacity$pressed]:
      tabTokens.stateLayerOpacity$pressed,

    [tabTokens.containerHeight$withIconAndLabelText]: '64px',

    [tabTokens.activeIconColor]: colorRolesTokens.primary,
    [tabTokens.activeIconColor$focus]: colorRolesTokens.primary,
    [tabTokens.activeIconColor$hover]: colorRolesTokens.primary,
    [tabTokens.activeIconColor$pressed]: colorRolesTokens.primary,

    [tabTokens.activeLabelTextColor]: colorRolesTokens.primary,
    [tabTokens.activeLabelTextColor$focus]: colorRolesTokens.primary,
    [tabTokens.activeLabelTextColor$hover]: colorRolesTokens.primary,
    [tabTokens.activeLabelTextColor$pressed]: colorRolesTokens.primary,
  },
  content$stacked: {
    flexDirection: 'column',
    gap: 2,
  },
  content$stacked$hasIcon$hasLabel: {
    height: tabTokens.containerHeight$withIconAndLabelText,
  },
});
