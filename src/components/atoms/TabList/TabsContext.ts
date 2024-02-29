import * as React from 'react';

import type { IAny, IMaybeAsync } from '@/helpers/types';

export type ITabContext = {
  onChange: (value: string | undefined) => IMaybeAsync<IAny>;
  value?: string;
};

export const TabContext = React.createContext<ITabContext | undefined>(
  undefined,
);
