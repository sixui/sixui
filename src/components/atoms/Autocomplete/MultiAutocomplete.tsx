import { MenuListDivider } from '@/components/atoms/MenuList/MenuListDivider';
import {
  AutocompleteBase,
  type IAutocompleteBaseProps,
} from './AutocompleteBase';
import { AutocompleteOption } from './AutocompleteOption';

export type IMultiAutocompleteProps = Omit<
  Extract<IAutocompleteBaseProps, { multiple: true }>,
  'multiple'
>;

const MultiAutocomplete: React.FC<IMultiAutocompleteProps> = (props) => (
  <AutocompleteBase {...props} multiple={true} />
);

const MultiAutocompleteNamespace = Object.assign(MultiAutocomplete, {
  Option: AutocompleteOption,
  Divider: MenuListDivider,
});

export { MultiAutocompleteNamespace as MultiAutocomplete };
