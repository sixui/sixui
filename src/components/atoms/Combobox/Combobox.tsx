import { MenuListDivider } from '@/components/atoms/MenuList/MenuListDivider';
import { ComboboxBase, type IComboboxBaseProps } from './ComboboxBase';
import { ComboboxOption } from './ComboboxOption';

export type IComboboxProps = Omit<
  Extract<IComboboxBaseProps, { multiple: false }>,
  'multiple'
>;

const Combobox: React.FC<IComboboxProps> = (props) => (
  <ComboboxBase {...props} multiple={false} />
);

const ComboboxNamespace = Object.assign(Combobox, {
  Option: ComboboxOption,
  Divider: MenuListDivider,
});

export { ComboboxNamespace as Combobox };
