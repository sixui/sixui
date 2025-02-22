import type { IMaybeAsync } from '~/utils/types';
import { createOptionalContext } from '~/utils/react/createOptionalContext';

export interface IRadioGroupContextValue {
  name?: string;
  onChange?: (value: string | undefined) => IMaybeAsync<unknown>;
  value?: string;
  changingValue?: string;
  loading?: boolean;
}

export const [RadioGroupContextProvider, useRadioGroupContext] =
  createOptionalContext<IRadioGroupContextValue>();
