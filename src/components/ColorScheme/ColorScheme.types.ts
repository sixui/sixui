import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type {
  colorSchemeTheme,
  IColorSchemeThemeFactory,
} from './ColorScheme.css';
import { ColorSchemeRole } from '../ColorSchemeRole';

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
