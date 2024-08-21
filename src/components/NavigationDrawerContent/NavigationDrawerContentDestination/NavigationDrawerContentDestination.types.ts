import type { IOmit } from '~/helpers/types';
import type { IBaseProps } from '~/components/Base';
import type { IListItemProps } from '../../ListItem';
import type { INavigationDrawerContentDestinationStylesKey } from './NavigationDrawerContentDestination.styles';

export type INavigationDrawerContentDestinationProps =
  IBaseProps<INavigationDrawerContentDestinationStylesKey> &
    IOmit<IListItemProps, 'styles'> & {
      active?: boolean;
    };
