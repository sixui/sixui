import type { StyleXStyles } from '@stylexjs/stylex';

import type { ISideSheetContentVariant } from '../SideSheetContent.types';
import { detachedModalSideSheetContentStyles } from './DetachedModalSideSheetContent.styles';
import { modalSideSheetContentStyles } from './ModalSideSheetContent.styles';

export const sideSheetVariantContentStyles: Partial<{
  [key in ISideSheetContentVariant]: Record<string, StyleXStyles>;
}> = {
  modal: modalSideSheetContentStyles,
  detachedModal: detachedModalSideSheetContentStyles,
};
