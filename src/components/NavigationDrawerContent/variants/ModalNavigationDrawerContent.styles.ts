import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { elevationTokens } from '~/components/Elevation/Elevation.stylex';
import { navigationDrawerContentTokens } from '../NavigationDrawerContent.stylex';

export const modalNavigationDrawerContentStyles = stylex.create({
  host: {
    [navigationDrawerContentTokens.containerColor]:
      colorSchemeTokens.surfaceContainerLow,
    [navigationDrawerContentTokens.containerElevation]:
      elevationTokens.boxShadow$level1,
  },
});
