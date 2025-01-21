import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { AppLayoutAside } from '../AppLayoutAside';
import type { AppLayoutBody } from '../AppLayoutBody/AppLayoutBody';
import type { AppLayoutFooter } from '../AppLayoutFooter';
import type { AppLayoutHeader } from '../AppLayoutHeader';
import type { AppLayoutNavigationDrawer } from '../AppLayoutNavigationDrawer/AppLayoutNavigationDrawer';
import type { AppLayoutNavigationRail } from '../AppLayoutNavigationRail';
import type { AppLayoutPane } from '../AppLayoutPane';
import type { AppLayoutSideSheet } from '../AppLayoutSideSheet';
import type { IBoxProps } from '../Box';
import type { IAppLayoutContextValue } from './AppLayout.context';
import type { appLayoutTheme, IAppLayoutThemeFactory } from './AppLayout.css';

export type IAppLayoutRenderProps = IAppLayoutContextValue;

export type IAppLayoutNavigationMode = 'bar' | 'rail' | 'standard';

export type IAppLayoutComponentName =
  | 'header'
  | 'navigationRail'
  | 'navigationDrawer'
  | 'aside';

export interface IAppLayoutOwnProps {
  children?:
    | ((props: IAppLayoutRenderProps) => React.ReactNode)
    | React.ReactNode;
  window?: Window;
  navigationDrawer?: {
    defaultClosed?: boolean;
  };
  aside?: {
    defaultClosed?: boolean;
  };
  preferredNavigationMode?: IAppLayoutNavigationMode;
  components: Array<IAppLayoutComponentName>;
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
    SideSheet: typeof AppLayoutSideSheet;
    NavigationDrawer: typeof AppLayoutNavigationDrawer;
    NavigationRail: typeof AppLayoutNavigationRail;
    Pane: typeof AppLayoutPane;
    Aside: typeof AppLayoutAside;
    Footer: typeof AppLayoutFooter;
  };
}>;
