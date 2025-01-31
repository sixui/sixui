import type { IBoxProps } from '~/components/Box';
import type { IComponentThemeProps } from '~/components/ThemeProvider';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type {
  colorSchemeTheme,
  IColorSchemeThemeFactory,
} from './ColorScheme.css';
import { ColorSchemeRole } from './ColorSchemeRole';

export interface IColorSchemeProps
  extends IBoxProps,
    IComponentThemeProps<IColorSchemeThemeFactory> {}

export type IColorSchemeFactory = IComponentFactory<{
  props: IColorSchemeProps;
  ref: HTMLDivElement;
  theme: typeof colorSchemeTheme;
  staticComponents: {
    Role: typeof ColorSchemeRole;
  };
}>;
