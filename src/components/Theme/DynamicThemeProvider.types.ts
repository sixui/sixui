import type { IContainerProps } from '~/helpers/types';
import type { IDynamicSchemeVariant } from '~/helpers/colors/getMaterialDynamicSchemeClass';
import type { IThemeProviderProps } from './ThemeProvider.types';

export type IDynamicThemeProviderProps = IContainerProps &
  Pick<IThemeProviderProps, 'settings' | 'componentsStyles'> & {
    children?: React.ReactNode;
    sourceColor: string;
    schemeVariant?: IDynamicSchemeVariant;
    contrast?: number;
  };
