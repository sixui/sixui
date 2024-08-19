import type { INavigationRailStylesKey } from './NavigationRail.styles';
import type { IBaseProps } from '~/components/Base';

export type INavigationRailProps = IBaseProps<INavigationRailStylesKey> & {
  children?: React.ReactNode;
  menu?: React.ReactNode;
  leading?: React.ReactNode;
  groupAlignment?: 'top' | 'center' | 'bottom';
};
