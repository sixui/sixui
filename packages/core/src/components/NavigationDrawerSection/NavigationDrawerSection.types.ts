import type { IBoxProps } from '~/components/Box';
import type { NavigationDrawerDestination } from '~/components/NavigationDrawerDestination';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type {
  INavigationDrawerSectionThemeFactory,
  navigationDrawerSectionTheme,
} from './NavigationDrawerSection.css';

export interface INavigationDrawerSectionOwnProps {
  headline?: React.ReactNode;
  children?: React.ReactNode;
  endDivider?: boolean;
}

export interface INavigationDrawerSectionProps
  extends IBoxProps,
    IComponentThemeProps<INavigationDrawerSectionThemeFactory>,
    INavigationDrawerSectionOwnProps {}

export type INavigationDrawerSectionFactory = IComponentFactory<{
  props: INavigationDrawerSectionProps;
  ref: HTMLDivElement;
  theme: typeof navigationDrawerSectionTheme;
  staticComponents: {
    Destination: typeof NavigationDrawerDestination;
  };
}>;
