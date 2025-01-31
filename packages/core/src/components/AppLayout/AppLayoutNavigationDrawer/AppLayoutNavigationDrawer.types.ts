import type { IBoxProps } from '~/components/Box';
import type {
  NavigationDrawerDestination,
  NavigationDrawerSection,
} from '~/components/NavigationDrawer';
import type { IComponentThemeProps } from '~/components/ThemeProvider';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type {
  appLayoutNavigationDrawerTheme,
  IAppLayoutNavigationDrawerThemeFactory,
} from './AppLayoutNavigationDrawer.css';
import { ISideSheetOwnProps } from '~/components/SideSheet';

export interface IAppLayoutNavigationDrawerOwnProps extends ISideSheetOwnProps {
  hasHeader?: boolean;
}

export interface IAppLayoutNavigationDrawerProps
  extends IBoxProps,
    IComponentThemeProps<IAppLayoutNavigationDrawerThemeFactory>,
    IAppLayoutNavigationDrawerOwnProps {}

export type IAppLayoutNavigationDrawerFactory = IComponentFactory<{
  props: IAppLayoutNavigationDrawerProps;
  ref: HTMLDivElement;
  theme: typeof appLayoutNavigationDrawerTheme;
  staticComponents: {
    Section: typeof NavigationDrawerSection;
    Destination: typeof NavigationDrawerDestination;
  };
}>;
