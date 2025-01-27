import type { IThemeProviderProps } from '~/components/ThemeProvider';
import type { ISixuiContextValue } from './SixuiProvider.context';

export interface ISixuiProviderProps
  extends ISixuiContextValue,
    IThemeProviderProps {}
