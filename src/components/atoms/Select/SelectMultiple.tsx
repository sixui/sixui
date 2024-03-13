import { MenuListDivider } from '@/components/atoms/MenuList/MenuListDivider';
import { SelectBase, type ISelectMultipleBaseProps } from './SelectBase';
import { SelectOption } from './SelectOption';

export type ISelectMultipleProps = Omit<ISelectMultipleBaseProps, 'multiple'>;

const SelectMultiple: React.FC<ISelectMultipleProps> = (props) => (
  <SelectBase {...props} multiple={true} />
);

const SelectMultipleNamespace = Object.assign(SelectMultiple, {
  Option: SelectOption,
  Divider: MenuListDivider,
});

export { SelectMultipleNamespace as SelectMultiple };
