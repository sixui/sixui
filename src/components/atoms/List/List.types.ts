import type { IContainerProps } from '@/helpers/types';
import type { IListStylesKey } from './List.styles';
import type { IListContextValue } from './ListContext';

export type IListProps = IContainerProps<IListStylesKey> &
  IListContextValue & {
    children?: React.ReactNode;
    header?: React.ReactNode;
    footer?: React.ReactNode;
  };
