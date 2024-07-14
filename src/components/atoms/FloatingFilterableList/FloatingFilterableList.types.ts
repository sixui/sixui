import type { IFilterableListItem } from '@/components/atoms/FilterableList';
import type { IFloatingFilterableListBaseProps } from '@/components/atoms/FloatingFilterableListBase';

export type IFloatingFilterableListProps = IFloatingFilterableListBaseProps<
  IFilterableListItem,
  HTMLButtonElement
>;
