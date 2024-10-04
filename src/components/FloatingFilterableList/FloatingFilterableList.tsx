import type { IFilterableListItem } from '../FilterableList';
import { floatingFilterableListBaseFactory } from '../FloatingFilterableListBase';

export const FloatingFilterableList = floatingFilterableListBaseFactory<
  IFilterableListItem,
  HTMLButtonElement
>();
