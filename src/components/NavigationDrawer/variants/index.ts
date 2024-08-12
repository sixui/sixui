import type { StyleXStyles } from '@stylexjs/stylex';

import type { INavigationDrawerVariant } from '../NavigationDrawer.types';
import { modalNavigationDrawerStyles } from './ModalNavigationDrawer.styles';

export const navigationDrawerVariantStyles: Partial<{
  [key in INavigationDrawerVariant]: Record<string, StyleXStyles>;
}> = {
  modal: modalNavigationDrawerStyles,
};
