import type { IThemeColorSchemeVariant, IThemeOverride } from './theme.types';

export type IThemeProviderProps = {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  theme?: IThemeOverride;
  colorSchemeVariant?: IThemeColorSchemeVariant;
  inherit?: boolean;
};
