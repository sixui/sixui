import { useContext } from 'react';

import { type ITabContext, TabContext } from './TabContext';

export type ITabsState = ITabContext;

export const useTabContext = (): ITabsState | undefined =>
  useContext(TabContext);
