import type { IBaseProps } from '~/components/Base';
import type { ISideSheetProps } from '~/components/SideSheet';
import type { IOmit } from '~/helpers/types';
import type { IAppLayoutNavigationDrawerStylesKey } from './AppLayoutNavigationDrawer.styles';

export type IAppLayoutNavigationDrawerProps =
  IBaseProps<IAppLayoutNavigationDrawerStylesKey> &
    IOmit<ISideSheetProps, 'styles'>;
