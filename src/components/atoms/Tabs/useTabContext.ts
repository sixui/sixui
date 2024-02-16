import * as React from 'react';

import { type ITabContextValue, TabContext } from './TabContext';

export interface ITabsState extends ITabContextValue {}

export const useTabContext = (): ITabsState | undefined =>
  React.useContext(TabContext);
