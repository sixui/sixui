import { createOptionalContext } from '~/utils/react/createOptionalContext';

export type IListContextValue = {
  noFocusRing?: boolean;
};

export const [ListContextProvider, useListContext] =
  createOptionalContext<IListContextValue>();
