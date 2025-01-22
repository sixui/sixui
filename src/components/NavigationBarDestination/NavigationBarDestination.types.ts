import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { IPaperOwnProps } from '../Paper';
import type {
  INavigationBarDestinationThemeFactory,
  navigationBarDestinationTheme,
} from './NavigationBarDestination.css';

export interface INavigationBarDestinationOwnProps extends IPaperOwnProps {
  children?: React.ReactNode;
  disabled?: boolean;
}

export interface INavigationBarDestinationProps
  extends IBoxProps,
    IComponentThemeProps<INavigationBarDestinationThemeFactory>,
    INavigationBarDestinationOwnProps {}

export type INavigationBarDestinationFactory = IComponentFactory<{
  props: INavigationBarDestinationProps;
  ref: HTMLDivElement;
  theme: typeof navigationBarDestinationTheme;
}>;
