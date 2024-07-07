import { createContext } from 'react';

import type { ICheckboxProps } from '@/components/atoms/Checkbox';

export type IDisclosureContextValue = Pick<
  ICheckboxProps,
  'defaultChecked' | 'checked' | 'onChange'
> & {
  setExpanded: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  getTriggerProps: (
    userProps?: React.HTMLProps<HTMLButtonElement>,
  ) => Record<string, unknown>;
  expanded?: boolean;
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
  getTriggerProps: stub,
};

export const DisclosureContext = createContext<IDisclosureContextValue>(
  disclosureInitialContext,
);
