import { forwardRef } from 'react';

import type { IOmit } from '@/helpers/types';
import { MenuListDivider } from '@/components/atoms/MenuList/MenuListDivider';
import { SelectBase, type ISelectBaseProps } from './SelectBase';
import { SelectOption } from './SelectOption';

export type IMultiSelectProps = IOmit<
  Extract<ISelectBaseProps, { multiple: true }>,
  'multiple'
>;

const MultiSelect = forwardRef<HTMLDivElement, IMultiSelectProps>(
  function MultiSelect(props, forwardedRef) {
    return <SelectBase {...props} ref={forwardedRef} multiple={true} />;
  },
);

const MultiSelectNamespace = Object.assign(MultiSelect, {
  Option: SelectOption,
  Divider: MenuListDivider,
});

export { MultiSelectNamespace as MultiSelect };
