import type { StyleXStyles } from '@stylexjs/stylex';

import type { IDrawerVariant } from '../Drawer.types';
import { detachedDrawerStyles } from './DetachedDrawer.styles';

export const drawerVariantStyles: Partial<{
  [key in IDrawerVariant]: Record<string, StyleXStyles>;
}> = {
  detached: detachedDrawerStyles,
};
