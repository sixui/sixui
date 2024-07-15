import type { ITheme } from '../theme.types';

import {
  darkColorRolesTokens,
  darkColorRolesTheme,
} from './tokens/darkColorRoles';

// FIXME: refactor
export const theme: ITheme = {
  name: 'Material Design 3',
  colorSchemes: {
    dark: darkColorRolesTheme,
  },
  colorRoles: {
    dark: darkColorRolesTokens,
  },
};
