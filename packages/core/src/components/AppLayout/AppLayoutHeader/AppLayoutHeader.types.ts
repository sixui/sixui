import type { IBoxProps } from '~/components/Box';
import type { IPaperOwnProps } from '~/components/Paper';
import type { IComponentThemeProps } from '~/components/ThemeProvider';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type {
  appLayoutHeaderTheme,
  IAppLayoutHeaderThemeFactory,
} from './AppLayoutHeader.css';

export interface IAppLayoutHeaderOwnProps extends IPaperOwnProps {
  children?: React.ReactNode;
  divider?: boolean;
}

export interface IAppLayoutHeaderProps
  extends IBoxProps,
    IComponentThemeProps<IAppLayoutHeaderThemeFactory>,
    IAppLayoutHeaderOwnProps {}

export type IAppLayoutHeaderFactory = IComponentFactory<{
  props: IAppLayoutHeaderProps;
  ref: HTMLDivElement;
  theme: typeof appLayoutHeaderTheme;
}>;
