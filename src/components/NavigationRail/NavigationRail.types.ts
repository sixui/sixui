import type { IBaseProps } from '~/components/Base';
import type { INavigationRailStylesKey } from './NavigationRail.styles';

export type INavigationRailProps = IBaseProps<INavigationRailStylesKey> & {
  children?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  groupAlignment?: 'start' | 'center' | 'end';
  divider?: boolean;
};
