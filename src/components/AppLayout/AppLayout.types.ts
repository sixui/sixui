import type { IBaseProps } from '~/components/Base';
import type { IAppLayoutStylesKey } from './AppLayout.styles';
import type { IUseSideSheetResult } from '../SideSheet/useSideSheet';

export type IAppLayoutProps = IBaseProps<IAppLayoutStylesKey> & {
  children?: React.ReactNode;
  navigationDrawer?: {
    sideSheet?: IUseSideSheetResult;
    fullHeight?: boolean;
  };
  aside?: {
    sideSheet?: IUseSideSheetResult;
    fullHeight?: boolean;
  };
};
