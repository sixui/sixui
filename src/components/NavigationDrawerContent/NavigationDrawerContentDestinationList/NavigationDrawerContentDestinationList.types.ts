import type { IListStylesKey } from '~/components/List';
import type { ICompiledStyles, IZeroOrMore } from '~/helpers/types';
import type { INavigationDrawerContentDestinationListStylesKey } from './NavigationDrawerContentDestinationList.styles';
import type { IBaseProps } from '~/components/Base';

export type INavigationDrawerContentDestinationListProps =
  IBaseProps<INavigationDrawerContentDestinationListStylesKey> & {
    children?: React.ReactNode;
    innerStyles?: {
      list?: IZeroOrMore<ICompiledStyles<IListStylesKey>>;
    };
    headline?: React.ReactNode;
    endDivider?: boolean;
  };
