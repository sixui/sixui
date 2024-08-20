import type { IBaseProps } from '~/components/Base';
import type { ISideSheetType } from '../SideSheet';
import type { INavigationDrawerStylesKey } from './NavigationDrawer.styles';

export type INavigationDrawerProps = IBaseProps<INavigationDrawerStylesKey> & {
  children?: React.ReactNode;
  type?: ISideSheetType;
};
