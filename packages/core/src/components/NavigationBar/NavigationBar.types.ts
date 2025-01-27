import type { IBoxProps } from '~/components/Box';
import type { IDrawerOwnProps } from '~/components/Drawer';
import type { IOmit } from '~/helpers/types';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type {
  INavigationBarThemeFactory,
  navigationBarTheme,
} from './NavigationBar.css';
import type { INavigationBarContentOwnProps } from './NavigationBarContent';
import type { NavigationBarDestination } from './NavigationBarDestination';

export interface INavigationBarOwnProps
  extends IOmit<IDrawerOwnProps, 'children' | 'side'>,
    INavigationBarContentOwnProps {}

export interface INavigationBarProps
  extends IBoxProps,
    IComponentThemeProps<INavigationBarThemeFactory>,
    INavigationBarOwnProps {}

export type INavigationBarFactory = IComponentFactory<{
  props: INavigationBarProps;
  ref: HTMLDivElement;
  theme: typeof navigationBarTheme;
  staticComponents: {
    Destination: typeof NavigationBarDestination;
  };
}>;
