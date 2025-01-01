import type { StyleXStyles } from '@stylexjs/stylex';

import type { INavigationDrawerContentVariant } from '../NavigationDrawerContent.types';
import { modalNavigationDrawerContentStyles } from './ModalNavigationDrawerContent.styles';

export const navigationDrawerContentVariantStyles: Partial<{
  [key in INavigationDrawerContentVariant]: Record<string, StyleXStyles>;
}> = {
  modal: modalNavigationDrawerContentStyles,
};
