import { createContext } from 'react';

export type ICardContext = {
  actionable?: boolean;
};

export const CardContext = createContext<ICardContext | undefined>(undefined);
