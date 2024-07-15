import type { IStyleVarsTheme } from '@/helpers/types';
import type { IColorRolesThemeVars } from './colorRoles.types';

// FIXME: refactor
export type ITheme = {
  name: string;
  colorSchemes: {
    dark: IStyleVarsTheme<keyof IColorRolesThemeVars>;
  };
  colorRoles: {
    dark: IColorRolesThemeVars;
  };
};

export type IThemeSettings = {
  linkAs: React.ElementType;
};
