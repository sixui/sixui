import {
  type INormalizeStringOptions,
  normalizeString,
} from './normalizeString';

export type ICreateFilterOptions<TItem> = INormalizeStringOptions & {
  limit?: number;
  matchFrom?: 'any' | 'start';
  stringify?: (option: TItem) => string;
};

export type IFilterItemsState<TItem> = {
  query: string;
  getItemLabel: (option: TItem) => string | undefined;
};

export type IFilter<TItem> = (
  items: Array<TItem>,
  state: IFilterItemsState<TItem>,
) => Array<TItem>;

const defaultOptions: ICreateFilterOptions<unknown> = {
  limit: 100,
  matchFrom: 'any',
};

export const createFilter = <TItem>(
  options?: ICreateFilterOptions<TItem>,
): IFilter<TItem> => {
  const { limit, matchFrom, stringify } = { ...defaultOptions, ...options };

  return (
    items: Array<TItem>,
    { query, getItemLabel }: IFilterItemsState<TItem>,
  ) => {
    const normalizedQuery = normalizeString(query, options);

    const filteredOptions = normalizedQuery
      ? items.filter((option) => {
          const candidate = (stringify ?? getItemLabel)(option);
          const normalizedCandidate = candidate
            ? normalizeString(candidate)
            : undefined;

          return normalizedCandidate
            ? matchFrom === 'start'
              ? normalizedCandidate.startsWith(normalizedQuery)
              : normalizedCandidate.indexOf(normalizedQuery) > -1
            : false;
        })
      : items;

    return typeof limit === 'number'
      ? filteredOptions.slice(0, limit)
      : filteredOptions;
  };
};
