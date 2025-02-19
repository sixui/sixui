import type { ISideSheetThemeFactory } from '~/components/SideSheet/SideSheet.css';
import { sideSheetTheme } from '~/components/SideSheet/SideSheet.css';

export type INavigationDrawerThemeFactory = ISideSheetThemeFactory;

export const navigationDrawerTheme = sideSheetTheme;
