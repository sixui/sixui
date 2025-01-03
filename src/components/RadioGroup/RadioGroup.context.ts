import type { IAny, IMaybeAsync } from '~/helpers/types';
import { createOptionalContext } from '~/helpers/createOptionalContext';

export interface IRadioGroupContextValue {
  name?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string | undefined,
  ) => IMaybeAsync<IAny>;
  value?: string;
  nextValue?: string;
  loading?: boolean;
}

export const [RadioGroupContextProvider, useRadioGroupContext] =
  createOptionalContext<IRadioGroupContextValue>();
