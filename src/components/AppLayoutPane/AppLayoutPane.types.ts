import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { IPaperOwnProps } from '../Paper';
import type {
  appLayoutPaneTheme,
  IAppLayoutPaneThemeFactory,
} from './AppLayoutPane.css';

export interface IAppLayoutPaneOwnProps extends IPaperOwnProps {
  children?: React.ReactNode;
}

export interface IAppLayoutPaneProps
  extends IBoxProps,
    IComponentThemeProps<IAppLayoutPaneThemeFactory>,
    IAppLayoutPaneOwnProps {}

export type IAppLayoutPaneFactory = IComponentFactory<{
  props: IAppLayoutPaneProps;
  ref: HTMLDivElement;
  theme: typeof appLayoutPaneTheme;
}>;
