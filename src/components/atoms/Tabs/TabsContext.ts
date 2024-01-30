import * as React from 'react';

import type { IAny, IMaybeAsync } from '@/helpers/types';
import type { ITabVariant } from '../Tab/Tab.styledefs';

export interface ITabsContextValue {
  anchor?: string;
  onTabActivated: (activeTab: HTMLElement, indicator: HTMLElement) => void;
  onChange: (anchor: string | undefined) => IMaybeAsync<IAny>;
  variant?: ITabVariant;
}

export const TabsContext = React.createContext<ITabsContextValue | undefined>(
  undefined,
);
