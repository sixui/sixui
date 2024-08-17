import type { IBaseProps } from '~/components/Base';
import type { IAppShellMainStylesKey } from './AppShellMain';
import type { IUseSideSheetResult } from '../SideSheet/useSideSheet';

export type IAppShellNavigationDrawerProps = {
  sideSheet?: IUseSideSheetResult;
};

export type IAppShellProps = IBaseProps<IAppShellMainStylesKey> & {
  children?: React.ReactNode;
  navigationDrawer?: IAppShellNavigationDrawerProps;
};
