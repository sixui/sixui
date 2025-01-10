import type { IMaybeAsync } from '~/helpers/types';
import { createOptionalContext } from '~/helpers/createOptionalContext';

export interface IRadioGroupContextValue {
  name?: string;
  onChange?: (value: string | undefined) => IMaybeAsync<unknown>;
  value?: string;
  changingValue?: string;
  loading?: boolean;
}

export const [RadioGroupContextProvider, useRadioGroupContext] =
  createOptionalContext<IRadioGroupContextValue>();
