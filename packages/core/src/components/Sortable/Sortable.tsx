import { sortableFactory } from './sortableFactory';

export const Sortable = sortableFactory<string>({
  getItemId: (id) => id,
});
