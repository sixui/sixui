import { MenuListDivider } from '@/components/atoms/MenuList/MenuListDivider';
import { SelectBase, type ISelectBaseProps } from './SelectBase';
import { SelectOption } from './SelectOption';

export type ISelectProps = Omit<
  Extract<ISelectBaseProps, { multiple: false }>,
  'multiple'
>;

const Select: React.FC<ISelectProps> = (props) => (
  <SelectBase {...props} multiple={false} />
);

const SelectNamespace = Object.assign(Select, {
  Option: SelectOption,
  Divider: MenuListDivider,
});

export { SelectNamespace as Select };
