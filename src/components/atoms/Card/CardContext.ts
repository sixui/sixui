import * as React from 'react';

export interface ICardContext {
  actionable?: boolean;
}

export const CardContext = React.createContext<ICardContext | undefined>(
  undefined,
);
