import stylex from '@stylexjs/stylex';

import { shapeTokens } from '~/themes/base/shape.stylex';
import { bottomSheetContentTokens } from '../BottomSheetContent.stylex';

export const minimizedBottomSheetContentStyles = stylex.create({
  host: {
    [bottomSheetContentTokens.containerShape$topLeft]: shapeTokens.corner$none,
    [bottomSheetContentTokens.containerShape$topRight]: shapeTokens.corner$none,
  },
});
