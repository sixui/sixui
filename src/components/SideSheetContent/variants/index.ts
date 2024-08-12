import type { StyleXStyles } from '@stylexjs/stylex';

import type { ISideSheetContentVariant } from '../SideSheetContent.types';
import { modalSideSheetContentStyles } from './ModalSideSheetContent.styles';
import { detachedSideSheetContentStyles } from './DetachedSideSheetContent.styles';

export const sideSheetVariantContentStyles: Partial<{
  [key in ISideSheetContentVariant]: Record<string, StyleXStyles>;
}> = {
  modal: modalSideSheetContentStyles,
  detached: detachedSideSheetContentStyles,
};
