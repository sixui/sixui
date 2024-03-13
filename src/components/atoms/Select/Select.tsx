import { MenuListDivider } from '@/components/atoms/MenuList/MenuListDivider';
import { SelectBase, type ISelectSingleBaseProps } from './SelectBase';
import { SelectOption } from './SelectOption';

export type ISelectProps = Omit<ISelectSingleBaseProps, 'multiple'>;

const Select: React.FC<ISelectProps> = (props) => (
  <SelectBase {...props} multiple={false} />
);

const SelectNamespace = Object.assign(Select, {
  Option: SelectOption,
  Divider: MenuListDivider,
});

export { SelectNamespace as Select };
