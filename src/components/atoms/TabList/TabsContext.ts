import { createContext } from 'react';

import type { IAny, IMaybeAsync } from '@/helpers/types';

export type ITabContext = {
  onChange: (value: string | undefined) => IMaybeAsync<IAny>;
  value?: string;
};

export const TabContext = createContext<ITabContext | undefined>(undefined);
