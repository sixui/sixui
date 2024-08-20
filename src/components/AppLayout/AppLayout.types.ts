import type { IBaseProps } from '~/components/Base';
import type { IAppLayoutStylesKey } from './AppLayout.styles';
import type {
  ICanonicalLayoutPreferredNavigationMode,
  ICanonicalLayoutType,
} from './useCanonicalLayout';
import { IAppLayoutContextValue } from './AppLayout.context';

export type IAppLayoutRenderProps = IAppLayoutContextValue;

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
  defaultCanonicalLayoutType?: ICanonicalLayoutType;
  navigationRail?: {
    fullHeight?: boolean;
  };
  navigationDrawer?: {
    defaultClosed?: boolean;
  };
  aside?: {
    defaultClosed?: boolean;
  };
  preferredNavigationMode?: ICanonicalLayoutPreferredNavigationMode;
  components: Array<IAppLayoutComponentName>;
};
