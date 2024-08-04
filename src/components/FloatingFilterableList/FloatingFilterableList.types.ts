import type { IFilterableListItem } from '../FilterableList';
import type { IFloatingFilterableListBaseProps } from '../FloatingFilterableListBase';

export type IFloatingFilterableListProps = IFloatingFilterableListBaseProps<
  IFilterableListItem,
  HTMLButtonElement
>;
