import { createContext } from 'react';

import type { IAny, IMaybeAsync } from '@/helpers/types';
import type { ITabVariant } from '@/components/Tab/Tab.types';

export type ITabContextValue = {
  id?: string;
  anchor?: string;
  onTabActivated: (activeTab: HTMLElement, indicator: HTMLElement) => void;
  onChange: (anchor: string | undefined) => IMaybeAsync<IAny>;
  variant?: ITabVariant;
};

export const TabContext = createContext<ITabContextValue | undefined>(
  undefined,
);
