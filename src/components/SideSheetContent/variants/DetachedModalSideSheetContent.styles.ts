import stylex from '@stylexjs/stylex';

import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { elevationTokens } from '~/components/Elevation/Elevation.stylex';
import { shapeTokens } from '~/themes/base/shape.stylex';
import { spacingTokens } from '~/themes/base/spacing.stylex';
import { outlineTokens } from '~/themes/base/outline.stylex';
import { sideSheetContentTokens } from '../SideSheetContent.stylex';

export const detachedModalSideSheetContentStyles = stylex.create({
  host: {
    [sideSheetContentTokens.leadingSpace$withIcon]: spacingTokens.padding$6,
    [sideSheetContentTokens.containerColor]:
      colorSchemeTokens.surfaceContainerLow,
    [sideSheetContentTokens.containerElevation]:
      elevationTokens.boxShadow$level1,
    [sideSheetContentTokens.dividerWidth]: outlineTokens.width$none,

    [sideSheetContentTokens.containerShape$topStart]: shapeTokens.corner$xl,
    [sideSheetContentTokens.containerShape$topEnd]: shapeTokens.corner$xl,
    [sideSheetContentTokens.containerShape$bottomStart]: shapeTokens.corner$xl,
    [sideSheetContentTokens.containerShape$bottomEnd]: shapeTokens.corner$xl,
  },
});
