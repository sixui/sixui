import type { IMaybeAsync } from '~/utils/types';
import { createOptionalContext } from '~/utils/react/createOptionalContext';

export interface ICheckboxGroupControlContextValue {
  onChange?: (
    value: Array<string>,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => IMaybeAsync<unknown>;
  defaultValue?: Array<string>;
  value?: Array<string>;
  loading?: boolean;
  changingValues?: Array<string>;
  disabled?: boolean;
  readOnly?: boolean;
  hasError?: boolean;
}

export const [
  CheckboxGroupControlContextProvider,
  useCheckboxGroupControlContext,
] = createOptionalContext<ICheckboxGroupControlContextValue>();
