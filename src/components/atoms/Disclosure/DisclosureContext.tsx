import { createContext } from 'react';

import type { ICheckboxProps } from '@/components/atoms/Checkbox';

export type IDisclosureContext = Pick<
  ICheckboxProps,
  'defaultChecked' | 'checked' | 'onChange'
> & {
  expanded?: boolean;
  setExpanded?: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  checkable?: boolean;
  disabled?: boolean;
};

const stub = (): never => {
  throw new Error(
    'You forgot to wrap your component in <DisclosureProvider />.',
  );
};

export const disclosureInitialContext: IDisclosureContext = {
  defaultChecked: false,
  checked: false,
  onChange: stub,
  expanded: false,
  setExpanded: stub,
  checkable: false,
  disabled: false,
};

export const DisclosureContext = createContext<IDisclosureContext>(
  disclosureInitialContext,
);
