import type { IBaseProps } from '~/components/Base';
import type { IAppLayoutStylesKey } from './AppLayout.styles';
import type { IUseSideSheetResult } from '../SideSheet/useSideSheet';
import type {
  ICanonicalLayoutPreferredNavigationMode,
  ICanonicalLayoutType,
} from './useCanonicalLayout';
import { IAppLayoutContextValue } from './AppLayout.context';

export type IAppLayoutRenderProps = IAppLayoutContextValue;

export type IAppLayoutProps = IBaseProps<IAppLayoutStylesKey> & {
  window?: Window;
  header?: {
    // TODO:
  };
  children?:
    | ((props: IAppLayoutRenderProps) => React.ReactNode)
    | React.ReactNode;
  defaultCanonicalLayoutType?: ICanonicalLayoutType;
  navigationRail?: {
    fullHeight?: boolean;
  };
  navigationDrawer?: {
    defaultClosed?: boolean;
    fullHeight?: boolean;
  };
  aside?: {
    sideSheet?: IUseSideSheetResult;
    fullHeight?: boolean;
  };
  preferredNavigationMode?: ICanonicalLayoutPreferredNavigationMode;
};
