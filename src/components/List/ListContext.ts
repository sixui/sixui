import { createContext } from 'react';

import type { IListItemProps } from '../ListItem';

export type IListContextValue = {
  size?: IListItemProps['size'];
  noFocusRing?: boolean;
};

export const ListContext = createContext<IListContextValue | undefined>(
  undefined,
);
