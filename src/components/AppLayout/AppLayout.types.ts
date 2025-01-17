import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { AppHeader } from '../AppHeader';
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
    Header: typeof AppHeader;
  };
}>;
