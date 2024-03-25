import { forwardRef } from 'react';

import { MenuListDivider } from '@/components/atoms/MenuList/MenuListDivider';
import { ComboboxBase, type IComboboxBaseProps } from './ComboboxBase';
import { ComboboxOption } from './ComboboxOption';

export type IComboboxProps = Omit<
  Extract<IComboboxBaseProps, { multiple: false }>,
  'multiple'
>;

const Combobox = forwardRef<HTMLDivElement, IComboboxProps>(
  function Combobox(props, ref) {
    return <ComboboxBase {...props} ref={ref} multiple={false} />;
  },
);

const ComboboxNamespace = Object.assign(Combobox, {
  Option: ComboboxOption,
  Divider: MenuListDivider,
});

export { ComboboxNamespace as Combobox };
