import type { IFilterableListItem } from '@/components/atoms/FilterableList';
import {
  FloatingFilterableListBase,
  type IFloatingFilterableListBaseProps,
} from '@/components/atoms/FloatingFilterableListBase';

export type IFloatingFilterableListProps = IFloatingFilterableListBaseProps<
  IFilterableListItem,
  HTMLButtonElement
>;

export const FloatingFilterableList: React.FC<IFloatingFilterableListProps> = (
  props,
) => <FloatingFilterableListBase {...props} />;
