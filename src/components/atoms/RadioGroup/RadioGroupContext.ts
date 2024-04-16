import { createContext } from 'react';

import type { IAny, IMaybeAsync } from '@/helpers/types';

export type IRadioGroupContext = {
  name?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string | undefined,
  ) => IMaybeAsync<IAny>;
  value?: string;
};

export const RadioGroupContext = createContext<IRadioGroupContext | undefined>(
  undefined,
);
