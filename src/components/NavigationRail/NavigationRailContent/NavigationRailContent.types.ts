import type { IBoxProps } from '~/components/Box';
import type { NavigationRailDestination } from '~/components/NavigationRail/NavigationRailDestination';
import type { IPaperBaseOwnProps } from '~/components/PaperBase';
import type { IHorizontalSide } from '~/helpers/types';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type {
  INavigationRailContentThemeFactory,
  navigationRailContentTheme,
} from './NavigationRailContent.css';

export interface INavigationRailContentOwnProps extends IPaperBaseOwnProps {
  header?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  justify?: 'start' | 'center' | 'end';
  divider?: boolean;
  side?: IHorizontalSide;
}

export interface INavigationRailContentProps
  extends IBoxProps,
    IComponentThemeProps<INavigationRailContentThemeFactory>,
    INavigationRailContentOwnProps {}

export type INavigationRailContentFactory = IComponentFactory<{
  props: INavigationRailContentProps;
  ref: HTMLDivElement;
  theme: typeof navigationRailContentTheme;
  staticComponents: {
    Destination: typeof NavigationRailDestination;
  };
}>;
