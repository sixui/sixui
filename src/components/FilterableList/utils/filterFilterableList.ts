import type { IFilterableListPredicate } from '../FilterableListBase';
import type { IFilterableListItem } from './FilterableList.types';
import { createFilter } from '~/helpers/createFilter';

export const filterFilterableList: IFilterableListPredicate<IFilterableListItem> =
  createFilter<IFilterableListItem>({
    getSearchableText: (item) => [
      typeof item.label === 'string' ? item.label : undefined,
      item.value,
      item.supportingText,
    ],
  });
