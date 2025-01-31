import { filterUndefineds } from '@olivierpascal/helpers';

import type { INormalizeStringOptions } from './normalizeString';
import { normalizeString } from './normalizeString';

export type ICreateFilterOptions<TItem> = INormalizeStringOptions & {
  limit?: number;
  matchFrom?: 'any' | 'start';
  getSearchableText: (
    item: TItem,
  ) => string | Array<string | undefined> | undefined;
};

export type IFilterItemsState = {
  query: string;
};

export type IFilter<TItem> = (
  items: Array<TItem>,
  query: string,
) => Array<TItem>;

const defaultOptions: Partial<ICreateFilterOptions<unknown>> = {
  limit: 100,
  matchFrom: 'any',
};

export const createFilter = <TItem>(
  userOptions: ICreateFilterOptions<TItem>,
): IFilter<TItem> => {
  const options: ICreateFilterOptions<TItem> = {
    ...defaultOptions,
    ...userOptions,
  };
  const { limit, matchFrom, getSearchableText } = options;

  return (items: Array<TItem>, query: string) => {
    const normalizedQuery = normalizeString(query, options);

    const filteredOptions = normalizedQuery
      ? items.filter((option) => {
          const candidate = getSearchableText(option);
          const candidates = Array.isArray(candidate) ? candidate : [candidate];
          const normalizedCandidates = filterUndefineds(candidates).map(
            (candidate) => normalizeString(candidate),
          );

          return normalizedCandidates.some((normalizedCandidate) =>
            normalizedCandidate
              ? matchFrom === 'start'
                ? normalizedCandidate.startsWith(normalizedQuery)
                : normalizedCandidate.includes(normalizedQuery)
              : false,
          );
        })
      : items;

    return typeof limit === 'number'
      ? filteredOptions.slice(0, limit)
      : filteredOptions;
  };
};
