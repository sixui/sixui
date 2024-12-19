import type { IAny, IMaybeAsync } from '~/helpers/types';
import { createOptionalContext } from '~/helpers/createOptionalContext';

export type IRadioGroupContextValue = {
  name?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string | undefined,
  ) => IMaybeAsync<IAny>;
  value?: string;
};

export const [RadioGroupContextProvider, useRadioGroupContext] =
  createOptionalContext<IRadioGroupContextValue>();
