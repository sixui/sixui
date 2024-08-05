import type { IBaseProps } from '../Base';
import type { IListStylesKey } from './List.styles';
import type { IListContextValue } from './ListContext';

export type IListProps = IBaseProps<IListStylesKey> &
  IListContextValue & {
    children?: React.ReactNode;
    header?: React.ReactNode;
    footer?: React.ReactNode;
    cols?: number;
  };
