import type { IColorSchemeManager } from './colorSchemeManager/types';
import type { IOsColorScheme, IThemeOverride } from './theme.types';

export interface IThemeProviderProps {
  children?: React.ReactNode;
  theme?: IThemeOverride;
  inherit?: boolean;
  cssVariablesSelector?: string;
  getRootElement?: () => HTMLElement | undefined;
  colorSchemeManager?: IColorSchemeManager;
  defaultColorScheme?: IOsColorScheme;
  forceColorScheme?: IOsColorScheme;
  enableColorSchemePersistence?: boolean;
  colorSchemeStorageKey?: string;
}
