import type { IAny, IMaybeAsync } from '~/helpers/types';
import { createOptionalContext } from '~/helpers/createOptionalContext';

export interface ICheckboxGroupContextValue {
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    values: Array<React.InputHTMLAttributes<HTMLInputElement>['value']>,
  ) => IMaybeAsync<IAny>;
  values?: Array<React.InputHTMLAttributes<HTMLInputElement>['value']>;
}

export const [CheckboxGroupContextProvider, useCheckboxGroupContext] =
  createOptionalContext<ICheckboxGroupContextValue>();
