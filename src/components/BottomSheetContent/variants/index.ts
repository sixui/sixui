import type { StyleXStyles } from '@stylexjs/stylex';

import type { IBottomSheetContentVariant } from '../BottomSheetContent.types';
import { modalBottomSheetContentStyles } from './ModalBottomSheetContent.styles';
import { minimizedBottomSheetContentStyles } from './MinimizedBottomSheetContent.styles';

export const bottomSheetVariantContentStyles: Partial<{
  [key in IBottomSheetContentVariant]: Record<string, StyleXStyles>;
}> = {
  modal: modalBottomSheetContentStyles,
  minimized: minimizedBottomSheetContentStyles,
};
