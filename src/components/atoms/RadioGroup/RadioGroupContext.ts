import * as React from 'react';

import type { IAny, IMaybeAsync } from '@/helpers/types';

export interface IRadioGroupContextValue {
  name?: string;
  onChange: (value: string | undefined) => IMaybeAsync<IAny>;
  value?: string;
}

export const RadioGroupContext = React.createContext<
  IRadioGroupContextValue | undefined
>(undefined);
