import type { IFilterableListItem } from '~/components/FilterableList';
import { floatingFilterableListBaseFactory } from '~/components/FloatingFilterableListBase';

export const FloatingFilterableList = floatingFilterableListBaseFactory<
  IFilterableListItem,
  HTMLElement
>();
