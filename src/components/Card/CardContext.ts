import { createContext } from 'react';

export type ICardContextValue = {
  actionable?: boolean;
};

export const CardContext = createContext<ICardContextValue | undefined>(
  undefined,
);
