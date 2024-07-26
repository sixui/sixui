import type { IFilterableListItem } from '~/components/FilterableList';
import type { IFloatingFilterableListBaseProps } from '~/components/FloatingFilterableListBase';

export type IFloatingFilterableListProps = IFloatingFilterableListBaseProps<
  IFilterableListItem,
  HTMLButtonElement
>;
