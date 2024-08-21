import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { elevationTokens } from '~/components/Elevation/Elevation.stylex';
import { bottomSheetContentTokens } from '../BottomSheetContent.stylex';

export const modalBottomSheetContentStyles = stylex.create({
  host: {
    [bottomSheetContentTokens.containerColor]:
      colorSchemeTokens.surfaceContainerLow,
    [bottomSheetContentTokens.containerElevation]:
      elevationTokens.boxShadow$level1,
  },
});
