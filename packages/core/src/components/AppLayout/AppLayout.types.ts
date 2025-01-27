import type { IBoxProps } from '~/components/Box';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IAppLayoutContextValue } from './AppLayout.context';
import type { appLayoutTheme, IAppLayoutThemeFactory } from './AppLayout.css';
import type { AppLayoutBody } from './AppLayoutBody';
import type { AppLayoutFooter } from './AppLayoutFooter';
import type { AppLayoutHeader } from './AppLayoutHeader';
import type { AppLayoutNavigationBar } from './AppLayoutNavigationBar';
import type { AppLayoutNavigationDrawer } from './AppLayoutNavigationDrawer';
import type { AppLayoutNavigationRail } from './AppLayoutNavigationRail';
import type { AppLayoutSideSheet } from './AppLayoutSideSheet';

export type IAppLayoutRenderProps = IAppLayoutContextValue;

export type IAppLayoutNavigationMode = 'bar' | 'rail' | 'standard';

export type IAppLayoutComponentName =
  | 'header'
  | 'navigationRail'
  | 'navigationDrawer'
  | 'navigationBar'
  | 'sideSheet';

export interface IAppLayoutOwnProps {
  children?:
    | ((props: IAppLayoutRenderProps) => React.ReactNode)
    | React.ReactNode;
  window?: Window;
  navigationDrawer?: {
    defaultClosed?: boolean;
  };
  sideSheet?: {
    defaultClosed?: boolean;
  };
  preferredNavigationMode?: IAppLayoutNavigationMode;
  components: Array<IAppLayoutComponentName>;
  pageBackgroundColor?: string;
}

export interface IAppLayoutProps
  extends IBoxProps,
    IComponentThemeProps<IAppLayoutThemeFactory>,
    IAppLayoutOwnProps {}

export type IAppLayoutFactory = IComponentFactory<{
  props: IAppLayoutProps;
  ref: HTMLDivElement;
  theme: typeof appLayoutTheme;
  staticComponents: {
    Header: typeof AppLayoutHeader;
    Body: typeof AppLayoutBody;
    NavigationBar: typeof AppLayoutNavigationBar;
    NavigationRail: typeof AppLayoutNavigationRail;
    NavigationDrawer: typeof AppLayoutNavigationDrawer;
    SideSheet: typeof AppLayoutSideSheet;
    Footer: typeof AppLayoutFooter;
  };
}>;
