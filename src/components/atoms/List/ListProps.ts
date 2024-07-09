import type { IContainerProps } from '@/helpers/types';
import type { IListStyleKey } from './List.styledefs';
import type { IListContextValue } from './ListContext';

export type IListProps = IContainerProps<IListStyleKey> &
  IListContextValue & {
    children?: React.ReactNode;
    header?: React.ReactNode;
    footer?: React.ReactNode;
  };
