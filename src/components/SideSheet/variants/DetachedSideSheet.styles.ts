import stylex from '@stylexjs/stylex';

import { spacingTokens } from '~/themes/base/spacing.stylex';
import { sideSheetTokens } from '../SideSheet.stylex';

export const detachedSideSheetStyles = stylex.create({
  host: {
    [sideSheetTokens.containerMargin]: spacingTokens.padding$4,
  },
});
