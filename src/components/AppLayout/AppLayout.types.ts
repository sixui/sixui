import type { IBaseProps } from '~/components/Base';
import type { IAppLayoutStylesKey } from './AppLayout.styles';
import { IAppLayoutContextValue } from './AppLayout.context';

export type IAppLayoutRenderProps = IAppLayoutContextValue;

export type IAppLayoutNavigationMode = 'bar' | 'rail' | 'standard';

export type IAppLayoutComponentName =
  | 'header'
  | 'navigationRail'
  | 'navigationDrawer'
  | 'aside';

export type IAppLayoutProps = IBaseProps<IAppLayoutStylesKey> & {
  window?: Window;
  children?:
    | ((props: IAppLayoutRenderProps) => React.ReactNode)
    | React.ReactNode;
  navigationRail?: {
    fullHeight?: boolean;
  };
  navigationDrawer?: {
    defaultClosed?: boolean;
  };
  aside?: {
    defaultClosed?: boolean;
  };
  preferredNavigationMode?: IAppLayoutNavigationMode;
  components: Array<IAppLayoutComponentName>;
};
