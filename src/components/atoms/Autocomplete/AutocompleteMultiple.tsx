import { MenuListDivider } from '@/components/atoms/MenuList/MenuListDivider';
import {
  AutocompleteBase,
  type IAutocompleteMultipleBaseProps,
} from './AutocompleteBase';
import { AutocompleteOption } from './AutocompleteOption';

export type IAutocompleteMultipleProps = Omit<
  IAutocompleteMultipleBaseProps,
  'multiple'
>;

const AutocompleteMultiple: React.FC<IAutocompleteMultipleProps> = (props) => (
  <AutocompleteBase {...props} multiple={true} />
);

const AutocompleteMultipleNamespace = Object.assign(AutocompleteMultiple, {
  Option: AutocompleteOption,
  Divider: MenuListDivider,
});

export { AutocompleteMultipleNamespace as AutocompleteMultiple };
