import * as React from 'react';

export type ICardContext = {
  actionable?: boolean;
};

export const CardContext = React.createContext<ICardContext | undefined>(
  undefined,
);
