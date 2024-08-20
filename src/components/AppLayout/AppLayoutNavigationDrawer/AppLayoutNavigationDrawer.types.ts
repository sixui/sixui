import type { IBaseProps } from '~/components/Base';
import type { IOmit } from '~/helpers/types';
import type { ISideSheetContentProps } from '~/components/SideSheetContent';
import type { IAppLayoutNavigationDrawerStylesKey } from './AppLayoutNavigationDrawer.styles';

export type IAppLayoutNavigationDrawerProps = ISideSheetContentProps & {
  detached?: boolean;
};
