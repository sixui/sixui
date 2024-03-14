import { MenuListDivider } from '@/components/atoms/MenuList/MenuListDivider';
import { ComboboxBase, type IComboboxBaseProps } from './ComboboxBase';
import { ComboboxOption } from './ComboboxOption';

export type IMultiComboboxProps = Omit<
  Extract<IComboboxBaseProps, { multiple: true }>,
  'multiple'
>;

const MultiCombobox: React.FC<IMultiComboboxProps> = (props) => (
  <ComboboxBase {...props} multiple={true} />
);

const MultiComboboxNamespace = Object.assign(MultiCombobox, {
  Option: ComboboxOption,
  Divider: MenuListDivider,
});

export { MultiComboboxNamespace as MultiCombobox };
