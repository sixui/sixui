import { createOptionalContext } from '~/helpers/createOptionalContext';

export type IListContextValue = {
  noFocusRing?: boolean;
};

export const [ListContextProvider, useListContext] =
  createOptionalContext<IListContextValue>();
