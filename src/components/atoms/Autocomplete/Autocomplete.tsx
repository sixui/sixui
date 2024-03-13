import { MenuListDivider } from '@/components/atoms/MenuList/MenuListDivider';
import {
  AutocompleteBase,
  type IAutocompleteSingleBaseProps,
} from './AutocompleteBase';
import { AutocompleteOption } from './AutocompleteOption';

export type IAutocompleteProps = Omit<IAutocompleteSingleBaseProps, 'multiple'>;

const Autocomplete: React.FC<IAutocompleteProps> = (props) => (
  <AutocompleteBase {...props} multiple={false} />
);

const AutocompleteNamespace = Object.assign(Autocomplete, {
  Option: AutocompleteOption,
  Divider: MenuListDivider,
});

export { AutocompleteNamespace as Autocomplete };
