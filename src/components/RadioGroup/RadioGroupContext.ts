import { createContext } from 'react';

import type { IAny, IMaybeAsync } from '~/helpers/types';

export type IRadioGroupContextValue = {
  name?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string | undefined,
  ) => IMaybeAsync<IAny>;
  value?: string;
  disabled?: boolean;
  softDisabled?: boolean;
};

export const RadioGroupContext = createContext<
  IRadioGroupContextValue | undefined
>(undefined);
