import type { StyleXStyles } from '@stylexjs/stylex';

import type { IBottomSheetContentVariant } from '../BottomSheetContent.types';
import { modalBottomSheetContentStyles } from './ModalBottomSheetContent.styles';

export const bottomsheetVariantContentStyles: Partial<{
  [key in IBottomSheetContentVariant]: Record<string, StyleXStyles>;
}> = {
  modal: modalBottomSheetContentStyles,
};
