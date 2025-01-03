import type { IAny, IMaybeAsync } from '~/helpers/types';
import { createOptionalContext } from '~/helpers/createOptionalContext';

export interface ICheckboxGroupContextValue {
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    values: Array<string>,
  ) => IMaybeAsync<IAny>;
  defaultValues?: Array<string>;
  values?: Array<string>;
  loading?: boolean;
}

export const [CheckboxGroupContextProvider, useCheckboxGroupContext] =
  createOptionalContext<ICheckboxGroupContextValue>();
