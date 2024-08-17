import type { IBaseProps } from '~/components/Base';
import type { ISideSheetProps } from '~/components/SideSheet';
import type { IOmit } from '~/helpers/types';
import type { IAppShellNavigationDrawerStylesKey } from './AppShellNavigationDrawer.styles';

export type IAppShellNavigationDrawerProps =
  IBaseProps<IAppShellNavigationDrawerStylesKey> &
    IOmit<ISideSheetProps, 'styles'>;
