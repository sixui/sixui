import type { ITheme } from '../theme.types';

import { darkColorRoles, darkColorRolesTheme } from './vars/darkColorRoles';

// FIXME: refactor
export const theme: ITheme = {
  name: 'Material Design 3',
  colorSchemes: {
    dark: darkColorRolesTheme,
  },
  colorRoles: {
    dark: darkColorRoles,
  },
};
