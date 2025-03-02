import type { IBoxProps } from '~/components/Box';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IAppLayoutContextValue } from './AppLayout.context';
import type { appLayoutTheme, IAppLayoutThemeFactory } from './AppLayout.css';
import type { AppLayoutBody } from './AppLayoutBody';
import type { AppLayoutFeedBody } from './AppLayoutFeedBody';
import type { AppLayoutFooter } from './AppLayoutFooter';
import type { AppLayoutListDetailBody } from './AppLayoutListDetailBody';
import type { AppLayoutNavigationBar } from './AppLayoutNavigationBar';
import type { AppLayoutNavigationDrawer } from './AppLayoutNavigationDrawer';
import type { AppLayoutNavigationRail } from './AppLayoutNavigationRail';
import type { AppLayoutSideSheet } from './AppLayoutSideSheet';
import type { AppLayoutSupportingPaneBody } from './AppLayoutSupportingPaneBody';
import type { AppLayoutTopBar } from './AppLayoutTopBar';

export type IAppLayoutChildrenRenderProps = IAppLayoutContextValue;

export type IAppLayoutNavigationMode = 'bar' | 'rail' | 'standard';

export type IAppLayoutComponentName =
  | 'topBar'
  | 'navigationRail'
  | 'navigationDrawer'
  | 'navigationBar'
  | 'sideSheet';

export interface IAppLayoutOwnProps {
  children?:
    | ((props: IAppLayoutChildrenRenderProps) => React.ReactNode)
    | React.ReactNode;
  window?: Window;
  navigationDrawer?: {
    defaultClosed?: boolean;
  };
  sideSheet?: {
    defaultClosed?: boolean;
  };
  preferredNavigationMode?: IAppLayoutNavigationMode;
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
    TopBar: typeof AppLayoutTopBar;
    Body: typeof AppLayoutBody;
    ListDetailBody: typeof AppLayoutListDetailBody;
    SupportingPaneBody: typeof AppLayoutSupportingPaneBody;
    FeedBody: typeof AppLayoutFeedBody;
    NavigationBar: typeof AppLayoutNavigationBar;
    NavigationRail: typeof AppLayoutNavigationRail;
    NavigationDrawer: typeof AppLayoutNavigationDrawer;
    SideSheet: typeof AppLayoutSideSheet;
    Footer: typeof AppLayoutFooter;
  };
}>;
