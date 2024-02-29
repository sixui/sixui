import * as React from 'react';

import { type ITabContext, TabContext } from './TabContext';

export type ITabsState = ITabContext;

export const useTabContext = (): ITabsState | undefined =>
  React.useContext(TabContext);
