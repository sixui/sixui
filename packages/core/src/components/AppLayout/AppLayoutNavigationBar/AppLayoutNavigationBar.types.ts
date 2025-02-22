import type { IBoxProps } from '~/components/Box';
import type { INavigationBarOwnProps } from '~/components/NavigationBar';
import type { NavigationBarDestination } from '~/components/NavigationBar/NavigationBarDestination';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type {
  appLayoutNavigationBarTheme,
  IAppLayoutNavigationBarThemeFactory,
} from './AppLayoutNavigationBar.css';

export type IAppLayoutNavigationBarOwnProps = INavigationBarOwnProps;

export interface IAppLayoutNavigationBarProps
  extends IBoxProps,
    IComponentThemeProps<IAppLayoutNavigationBarThemeFactory>,
    IAppLayoutNavigationBarOwnProps {}

export type IAppLayoutNavigationBarFactory = IComponentFactory<{
  props: IAppLayoutNavigationBarProps;
  ref: HTMLDivElement;
  theme: typeof appLayoutNavigationBarTheme;
  staticComponents: {
    Destination: typeof NavigationBarDestination;
  };
}>;
