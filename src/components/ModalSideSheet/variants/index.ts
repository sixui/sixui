import type { StyleXStyles } from '@stylexjs/stylex';

import type { IModalSideSheetVariant } from '../ModalSideSheet.types';
import { detachedModalSideSheetStyles } from './DetachedModalSideSheet.styles';

export const modalSideSheetVariantStyles: Partial<{
  [key in IModalSideSheetVariant]: Record<string, StyleXStyles>;
}> = {
  detached: detachedModalSideSheetStyles,
};
