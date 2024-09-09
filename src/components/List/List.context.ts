import { createContext } from 'react';

export type IListContextValue = {
  // size?: 'sm' | 'md' | 'lg' | 'xl';
  noFocusRing?: boolean;
};

export const ListContext = createContext<IListContextValue | undefined>(
  undefined,
);
