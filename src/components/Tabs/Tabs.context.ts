import { createContext } from 'react';

import type { IAny, IMaybeAsync } from '~/helpers/types';
import type { ITabVariant } from '../Tab/Tab.types';

export type ITabsContextValue = {
  id?: string;
  anchor?: string;
  onTabActivated: (activeTab: HTMLElement, indicator: HTMLElement) => void;
  onChange: (anchor: string | undefined) => IMaybeAsync<IAny>;
  variant?: ITabVariant;
  disabled?: boolean;
};

export const TabsContext = createContext<ITabsContextValue | undefined>(
  undefined,
);
