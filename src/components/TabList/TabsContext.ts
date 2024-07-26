import { createContext } from 'react';

import type { IAny, IMaybeAsync } from '~/helpers/types';

export type ITabContextValue = {
  onChange: (value: string | undefined) => IMaybeAsync<IAny>;
  value?: string;
};

export const TabContext = createContext<ITabContextValue | undefined>(
  undefined,
);
