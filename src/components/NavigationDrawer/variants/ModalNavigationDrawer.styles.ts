import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { elevationTokens } from '~/components/Elevation/Elevation.stylex';
import { navigationDrawerTokens } from '../NavigationDrawer.stylex';

export const modalNavigationDrawerStyles = stylex.create({
  host: {
    [navigationDrawerTokens.containerColor]:
      colorSchemeTokens.surfaceContainerLow,
    [navigationDrawerTokens.containerElevation]:
      elevationTokens.boxShadow$level1,
  },
});
