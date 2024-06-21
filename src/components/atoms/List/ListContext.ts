import { createContext } from 'react';

import type { IListItemProps } from '@/components/atoms/ListItem';

export type IListContextValue = {
  size?: IListItemProps['size'];
};

export const ListContext = createContext<IListContextValue | undefined>(
  undefined,
);
