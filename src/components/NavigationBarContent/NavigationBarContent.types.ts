import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { IPaperOwnProps } from '../Paper';
import type {
  INavigationBarContentThemeFactory,
  navigationBarContentTheme,
} from './NavigationBarContent.css';

export interface INavigationBarContentOwnProps extends IPaperOwnProps {
  children?: React.ReactNode;
  disabled?: boolean;
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
