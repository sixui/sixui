import * as React from 'react';

import type { IAny, IMaybeAsync } from '@/helpers/types';

export interface ITabContextValue {
  onChange: (value: string | undefined) => IMaybeAsync<IAny>;
  value?: string;
}

export const TabContext = React.createContext<ITabContextValue | undefined>(
  undefined,
);
