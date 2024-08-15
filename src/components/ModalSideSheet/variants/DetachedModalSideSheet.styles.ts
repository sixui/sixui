import stylex from '@stylexjs/stylex';

import { spacingTokens } from '~/themes/base/spacing.stylex';
import { modalSideSheetTokens } from '../ModalSideSheet.stylex';

export const detachedModalSideSheetStyles = stylex.create({
  host: {
    [modalSideSheetTokens.containerMargin]: spacingTokens.padding$4,
  },
});
