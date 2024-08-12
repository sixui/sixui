import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { elevationTokens } from '~/components/Elevation/Elevation.stylex';
import { shapeTokens } from '~/themes/base/shape.stylex';
import { spacingTokens } from '~/themes/base/spacing.stylex';
import { sideSheetContentTokens } from '../SideSheetContent.stylex';

export const detachedSideSheetContentStyles = stylex.create({
  host: {
    [sideSheetContentTokens.leadingSpace$withIcon]: spacingTokens.padding$6,
    [sideSheetContentTokens.containerColor]:
      colorSchemeTokens.surfaceContainerLow,
    [sideSheetContentTokens.containerElevation]:
      elevationTokens.boxShadow$level1,
    [sideSheetContentTokens.containerShape$topLeft]: shapeTokens.corner$xl,
    [sideSheetContentTokens.containerShape$topRight]: shapeTokens.corner$xl,
    [sideSheetContentTokens.containerShape$bottomLeft]: shapeTokens.corner$xl,
    [sideSheetContentTokens.containerShape$bottomRight]: shapeTokens.corner$xl,
  },
});
