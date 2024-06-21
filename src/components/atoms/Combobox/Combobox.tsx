import { forwardRef } from 'react';

import type { IOmit } from '@/helpers/types';
import { MenuListDivider } from '@/components/atoms/MenuList/MenuListDivider';
import { ComboboxBase, type IComboboxBaseProps } from './ComboboxBase';
import { ComboboxOption } from './ComboboxOption';

export type IComboboxProps = IOmit<
  Extract<IComboboxBaseProps, { multiple: false }>,
  'multiple'
>;

const Combobox = forwardRef<HTMLInputElement, IComboboxProps>(
  function Combobox(props, forwardedRef) {
    return <ComboboxBase {...props} ref={forwardedRef} multiple={false} />;
  },
);

const ComboboxNamespace = Object.assign(Combobox, {
  Option: ComboboxOption,
  Divider: MenuListDivider,
});

export { ComboboxNamespace as Combobox };
