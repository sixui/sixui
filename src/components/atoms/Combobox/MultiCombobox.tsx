import { forwardRef } from 'react';

import type { IOmit } from '@/helpers/types';
import { MenuListDivider } from '@/components/atoms/MenuList/MenuListDivider';
import { ComboboxBase, type IComboboxBaseProps } from './ComboboxBase';
import { ComboboxOption } from './ComboboxOption';

export type IMultiComboboxProps = IOmit<
  Extract<IComboboxBaseProps, { multiple: true }>,
  'multiple'
>;

const MultiCombobox = forwardRef<HTMLInputElement, IMultiComboboxProps>(
  function MultiCombobox(props, forwardedRef) {
    return <ComboboxBase {...props} ref={forwardedRef} multiple={true} />;
  },
);

const MultiComboboxNamespace = Object.assign(MultiCombobox, {
  Option: ComboboxOption,
  Divider: MenuListDivider,
});

export { MultiComboboxNamespace as MultiCombobox };
