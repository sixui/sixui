import * as React from 'react';

import type { IAny, IMaybeAsync } from '@/helpers/types';
import type { ITabVariant } from '../Tab/Tab.styledefs';

export interface ITabContextValue {
  id?: string;
  anchor?: string;
  onTabActivated: (activeTab: HTMLElement, indicator: HTMLElement) => void;
  onChange: (anchor: string | undefined) => IMaybeAsync<IAny>;
  variant?: ITabVariant;
}

export const TabContext = React.createContext<ITabContextValue | undefined>(
  undefined,
);
