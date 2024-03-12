import { Fragment } from 'react';
import { Combobox } from '@headlessui/react';

import { type IListItemProps, ListItem } from '@/components/atoms/ListItem';

export type IAutocompleteOptionProps = Omit<IListItemProps, 'type'> & {
  value: string;
  children?: React.ReactNode;
  displayValue?: string;
};

export const AutocompleteOption: React.FC<IAutocompleteOptionProps> = (
  props,
) => {
  const { value, children, displayValue, ...other } = props;

  return (
    <Combobox.Option as={Fragment} disabled={props.disabled} value={value}>
      {({ active }) => (
        <ListItem {...other} active={active}>
          {children ?? displayValue}
        </ListItem>
      )}
    </Combobox.Option>
  );
};
