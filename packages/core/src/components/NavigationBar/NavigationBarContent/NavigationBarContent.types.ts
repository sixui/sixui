import type { IBoxProps } from '~/components/Box';
import type { IPaperOwnProps } from '~/components/Paper';
import type { IComponentThemeProps } from '~/components/ThemeProvider';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type {
  INavigationBarContentThemeFactory,
  navigationBarContentTheme,
} from './NavigationBarContent.css';

export interface INavigationBarContentOwnProps extends IPaperOwnProps {
  children?: React.ReactNode;
}

export interface INavigationBarContentProps
  extends IBoxProps,
    IComponentThemeProps<INavigationBarContentThemeFactory>,
    INavigationBarContentOwnProps {}

export type INavigationBarContentFactory = IComponentFactory<{
  props: INavigationBarContentProps;
  ref: HTMLDivElement;
  theme: typeof navigationBarContentTheme;
}>;
