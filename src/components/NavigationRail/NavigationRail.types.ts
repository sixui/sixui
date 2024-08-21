import type { INavigationRailStylesKey } from './NavigationRail.styles';
import type { IBaseProps } from '~/components/Base';

export type INavigationRailProps = IBaseProps<INavigationRailStylesKey> & {
  children?: React.ReactNode;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  groupAlignment?: 'start' | 'center' | 'end';
  divider?: boolean;
};
