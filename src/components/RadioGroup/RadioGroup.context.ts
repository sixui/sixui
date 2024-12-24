import type { IAny, IMaybeAsync } from '~/helpers/types';
import { createOptionalContext } from '~/helpers/createOptionalContext';

export interface IRadioGroupContextValue {
  name?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: React.InputHTMLAttributes<HTMLInputElement>['value'],
  ) => IMaybeAsync<IAny>;
  value?: React.InputHTMLAttributes<HTMLInputElement>['value'];
  nextValue?: React.InputHTMLAttributes<HTMLInputElement>['value'];
  loading?: boolean;
}

export const [RadioGroupContextProvider, useRadioGroupContext] =
  createOptionalContext<IRadioGroupContextValue>();
