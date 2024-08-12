import stylex from '@stylexjs/stylex';

import { bottomSheetContentTokens } from '../BottomSheetContent.stylex';
import { shapeTokens } from '~/themes/base/shape.stylex';

export const minimizedBottomSheetContentStyles = stylex.create({
  host: {
    [bottomSheetContentTokens.containerShape$topLeft]: shapeTokens.corner$none,
    [bottomSheetContentTokens.containerShape$topRight]: shapeTokens.corner$none,
  },
});
