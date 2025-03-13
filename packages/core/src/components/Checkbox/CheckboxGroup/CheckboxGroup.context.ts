import type { IMaybeAsync } from '~/utils/types';
import { createOptionalContext } from '~/utils/react/createOptionalContext';

export interface ICheckboxGroupContextValue {
  onChange?: (
    values: Array<string>,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => IMaybeAsync<unknown>;
  defaultValues?: Array<string>;
  values?: Array<string>;
  loading?: boolean;
  changingValues?: Array<string>;
}

export const [CheckboxGroupContextProvider, useCheckboxGroupContext] =
  createOptionalContext<ICheckboxGroupContextValue>();
