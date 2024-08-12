import type { StyleXStyles } from '@stylexjs/stylex';

import type { ISideSheetVariant } from '../SideSheet.types';
import { detachedSideSheetStyles } from './DetachedSideSheet.styles';

export const sideSheetVariantStyles: Partial<{
  [key in ISideSheetVariant]: Record<string, StyleXStyles>;
}> = {
  detached: detachedSideSheetStyles,
};
