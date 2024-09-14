import type { IThemeColorSchemeVariant, IThemeOverride } from './theme.types';

export interface IThemeProviderProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  theme?: IThemeOverride;
  colorSchemeVariant?: IThemeColorSchemeVariant;
  inherit?: boolean;
}
