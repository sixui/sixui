import stylex from '@stylexjs/stylex';

import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { tabTokens } from '../Tab.stylex';

// https://github.com/material-components/material-web/blob/main/tabs/internal/_primary-tab.scss

export const primaryTabStyles = stylex.create({
  host: {
    [tabTokens.activeIndicatorHeight]: '3px',
    [tabTokens.activeIndicatorShape]: '3px 3px 0 0',

    [tabTokens.activeStateLayerColor$hover]: colorRolesVars.primary,
    [tabTokens.activeStateLayerOpacity$hover]:
      tabTokens.stateLayerOpacity$hover,
    [tabTokens.activeStateLayerColor$pressed]: colorRolesVars.primary,
    [tabTokens.activeStateLayerOpacity$pressed]:
      tabTokens.stateLayerOpacity$pressed,

    [tabTokens.containerHeight$withIconAndLabelText]: '64px',

    [tabTokens.activeIconColor]: colorRolesVars.primary,
    [tabTokens.activeIconColor$focus]: colorRolesVars.primary,
    [tabTokens.activeIconColor$hover]: colorRolesVars.primary,
    [tabTokens.activeIconColor$pressed]: colorRolesVars.primary,

    [tabTokens.activeLabelTextColor]: colorRolesVars.primary,
    [tabTokens.activeLabelTextColor$focus]: colorRolesVars.primary,
    [tabTokens.activeLabelTextColor$hover]: colorRolesVars.primary,
    [tabTokens.activeLabelTextColor$pressed]: colorRolesVars.primary,
  },
  content$stacked: {
    flexDirection: 'column',
    gap: 2,
  },
  content$stacked$hasIcon$hasLabel: {
    height: tabTokens.containerHeight$withIconAndLabelText,
  },
});
