import { createContext } from 'react';

export type IListContextValue = {
  noFocusRing?: boolean;
};

export const ListContext = createContext<IListContextValue | undefined>(
  undefined,
);
