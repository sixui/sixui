import type { IColorSchemeManager } from '~/components/ColorScheme';
import type { IColorScheme, IThemeOverride } from './theme.types';

export interface IThemeProviderProps {
  children?: React.ReactNode;
  theme?: IThemeOverride;
  inherit?: boolean;
  cssVariablesSelector?: string;
  getRootElement?: () => HTMLElement | undefined;
  colorSchemeManager?: IColorSchemeManager;
  defaultColorScheme?: IColorScheme;
  forceColorScheme?: IColorScheme;
  enableColorSchemePersistence?: boolean;
  colorSchemeStorageKey?: string;
}
