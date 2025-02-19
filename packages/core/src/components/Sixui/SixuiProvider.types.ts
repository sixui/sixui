import type { IThemeProviderProps } from '~/components/Theme';
import type { ISixuiContextValue } from './SixuiProvider.context';

export interface ISixuiProviderProps
  extends ISixuiContextValue,
    IThemeProviderProps {}
