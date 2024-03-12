import stylex from '@stylexjs/stylex';
import { Fragment } from 'react';
import { Combobox } from '@headlessui/react';

import { type IListItemProps, ListItem } from '@/components/atoms/ListItem';

export type IAutocompleteOptionProps = Omit<IListItemProps, 'type'> & {
  value: string;
  children?: React.ReactNode;
  displayValue?: string;
};

// TODO: migrate in theme
const styles = stylex.create({
  host: {
    cursor: 'pointer',
  },
  host$disabled: {
    cursor: 'default',
  },
});

export const AutocompleteOption: React.FC<IAutocompleteOptionProps> = (
  props,
) => {
  const { sx, value, children, displayValue, ...other } = props;

  return (
    <Combobox.Option as={Fragment} disabled={props.disabled} value={value}>
      {({ active }) => (
        <ListItem
          {...other}
          sx={[styles.host, props.disabled && styles.host$disabled, sx]}
          active={active}
        >
          {children ?? displayValue}
        </ListItem>
      )}
    </Combobox.Option>
  );
};
