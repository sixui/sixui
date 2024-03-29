import { createContext } from 'react';

import type { ICheckboxProps } from '@/components/atoms/Checkbox';

export type IDisclosureContext = Pick<
  ICheckboxProps,
  'defaultChecked' | 'checked' | 'onChange'
> & {
  checkable?: boolean;
};

export const DisclosureContext = createContext<IDisclosureContext | undefined>(
  undefined,
);
