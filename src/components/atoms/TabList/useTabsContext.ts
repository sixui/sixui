import React from 'react';

import { type ITabsContextValue, TabsContext } from './TabsContext';

export interface ITabsState extends ITabsContextValue {}

export const useTabsContext = (): ITabsState | undefined =>
  React.useContext(TabsContext);
