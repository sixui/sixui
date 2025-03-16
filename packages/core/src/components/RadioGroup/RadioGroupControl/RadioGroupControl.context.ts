import type { IMaybeAsync } from '~/utils/types';
import { createOptionalContext } from '~/utils/react/createOptionalContext';

export interface IRadioGroupControlContextValue {
  name?: string;
  onChange?: (
    value: string | undefined,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => IMaybeAsync<unknown>;
  value?: string;
  changingValue?: string;
  loading?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  hasError?: boolean;
}

export const [RadioGroupControlContextProvider, useRadioGroupControlContext] =
  createOptionalContext<IRadioGroupControlContextValue>();
