import { createContext } from 'react';

import type { ICheckboxProps } from '@/components/atoms/Checkbox';

export type IDisclosureContextValue = Pick<
  ICheckboxProps,
  'defaultChecked' | 'checked' | 'onChange'
> & {
  expanded?: boolean;
  setExpanded?: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  checkable?: boolean;
  withSwitch?: boolean;
  loading?: boolean;
  disabled?: boolean;
};

const stub = (): never => {
  throw new Error(
    'You forgot to wrap your component in <DisclosureContext.Provider />.',
  );
};

export const disclosureInitialContext: IDisclosureContextValue = {
  defaultChecked: false,
  checked: false,
  onChange: stub,
  expanded: false,
  setExpanded: stub,
  checkable: false,
  withSwitch: false,
  loading: false,
  disabled: false,
};

export const DisclosureContext = createContext<IDisclosureContextValue>(
  disclosureInitialContext,
);
