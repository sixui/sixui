import { forwardRef } from 'react';

import type { IOmit } from '@/helpers/types';
import { MenuListDivider } from '@/components/atoms/MenuList/MenuListDivider';
import { SelectBase, type ISelectBaseProps } from './SelectBase';
import { SelectOption } from './SelectOption';

export type ISelectProps = IOmit<
  Extract<ISelectBaseProps, { multiple: false }>,
  'multiple'
>;

const Select = forwardRef<HTMLDivElement, ISelectProps>(
  function Select(props, ref) {
    return <SelectBase {...props} ref={ref} multiple={false} />;
  },
);

const SelectNamespace = Object.assign(Select, {
  Option: SelectOption,
  Divider: MenuListDivider,
});

export { SelectNamespace as Select };
