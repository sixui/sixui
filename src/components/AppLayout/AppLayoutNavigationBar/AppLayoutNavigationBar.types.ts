import type { IBoxProps } from '~/components/Box';
import type { INavigationBarOwnProps } from '~/components/NavigationBar';
import type { NavigationBarDestination } from '~/components/NavigationBarDestination';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type {
  appLayoutNavigationBarTheme,
  IAppLayoutNavigationBarThemeFactory,
} from './AppLayoutNavigationBar.css';

export interface IAppLayoutNavigationBarOwnProps
  extends INavigationBarOwnProps {
  hasHeader?: boolean;
}

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
