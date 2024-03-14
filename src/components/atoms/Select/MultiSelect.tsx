import { MenuListDivider } from '@/components/atoms/MenuList/MenuListDivider';
import { SelectBase, type ISelectBaseProps } from './SelectBase';
import { SelectOption } from './SelectOption';

export type IMultiSelectProps = Omit<
  Extract<ISelectBaseProps, { multiple: true }>,
  'multiple'
>;

const MultiSelect: React.FC<IMultiSelectProps> = (props) => (
  <SelectBase {...props} multiple={true} />
);

const MultiSelectNamespace = Object.assign(MultiSelect, {
  Option: SelectOption,
  Divider: MenuListDivider,
});

export { MultiSelectNamespace as MultiSelect };
