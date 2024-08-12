import type { INavigationDrawerStylesKey } from './NavigationDrawer.styles';
import { IBaseProps } from '~/components/Base';

export type INavigationDrawerVariant = 'standard' | 'modal';

export type INavigationDrawerProps = IBaseProps<INavigationDrawerStylesKey> & {
  children?: React.ReactNode;
  variant?: INavigationDrawerVariant;
};
