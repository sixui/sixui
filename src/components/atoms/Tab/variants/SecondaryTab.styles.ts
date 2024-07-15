import stylex from '@stylexjs/stylex';

import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { tabTokens } from '../Tab.stylex';

// https://github.com/material-components/material-web/blob/main/tabs/internal/_primary-tab.scss

export const secondaryTabStyles = stylex.create({
  host: {
    [tabTokens.activeIndicatorHeight]: '2px',
    [tabTokens.activeIndicatorShape]: '0',

    [tabTokens.activeLabelTextColor]: colorRolesVars.onSurface,

    [tabTokens.activeIconColor]: tabTokens.iconColor,
    [tabTokens.activeIconColor$focus]: tabTokens.iconColor$focus,
    [tabTokens.activeIconColor$hover]: tabTokens.iconColor$hover,
    [tabTokens.activeIconColor$pressed]: tabTokens.iconColor$pressed,

    [tabTokens.activeLabelTextColor$focus]: tabTokens.labelTextColor$focus,
    [tabTokens.activeLabelTextColor$hover]: tabTokens.labelTextColor$hover,
    [tabTokens.activeLabelTextColor$pressed]: tabTokens.labelTextColor$pressed,

    [tabTokens.activeStateLayerColor$hover]: tabTokens.stateLayerColor$hover,
    [tabTokens.activeStateLayerOpacity$hover]:
      tabTokens.stateLayerOpacity$hover,
    [tabTokens.activeStateLayerColor$pressed]:
      tabTokens.stateLayerColor$pressed,
    [tabTokens.activeStateLayerOpacity$pressed]:
      tabTokens.stateLayerOpacity$pressed,
  },
});
