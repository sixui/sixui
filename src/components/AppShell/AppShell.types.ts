import type { IBaseProps } from '~/components/Base';
import type { IAppShellStylesKey } from './AppShell.styles';
import type { IUseSideSheetResult } from '../SideSheet/useSideSheet';

export type IAppShellNavigationDrawerProps = {
  sideSheet?: IUseSideSheetResult;
};

export type IAppShellProps = IBaseProps<IAppShellStylesKey> & {
  children?: React.ReactNode;
  navigationDrawer?: IAppShellNavigationDrawerProps;
};
