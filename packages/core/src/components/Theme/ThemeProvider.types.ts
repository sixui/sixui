import type { IThemeColorSchemeVariant, IThemeOverride } from './theme.types';

export interface IThemeProviderProps {
  children?: React.ReactNode;
  theme?: IThemeOverride;
  colorSchemeVariant?: IThemeColorSchemeVariant;
  inherit?: boolean;
  cssVariablesSelector?: string;
  getRootElement?: () => HTMLElement | undefined;
}
