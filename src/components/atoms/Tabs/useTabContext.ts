import * as React from 'react';

import { type ITabContext, TabContext } from './TabContext';

export interface ITabsState extends ITabContext {}

export const useTabContext = (): ITabsState | undefined =>
  React.useContext(TabContext);
