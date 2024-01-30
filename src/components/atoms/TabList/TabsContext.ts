import * as React from 'react';

import type { IAny, IMaybeAsync } from '@/helpers/types';

export interface ITabsContextValue {
  onChange: (value: string | undefined) => IMaybeAsync<IAny>;
  value?: string;
}

export const TabsContext = React.createContext<ITabsContextValue | undefined>(
  undefined,
);
