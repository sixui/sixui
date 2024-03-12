import { Fragment } from 'react';
import { Combobox } from '@headlessui/react';

import { type IListItemProps, ListItem } from '@/components/atoms/ListItem';

export type IAutocompleteOptionProps = Omit<IListItemProps, 'type'> & {
  children: React.ReactNode;
  value: string;
};

export const AutocompleteOption: React.FC<IAutocompleteOptionProps> = (
  props,
) => {
  const { children, value, ...other } = props;

  return (
    <Combobox.Option as={Fragment} disabled={props.disabled} value={value}>
      {({ active }) => (
        <ListItem {...other} active={active}>
          {children}
        </ListItem>
      )}
    </Combobox.Option>
  );
};
