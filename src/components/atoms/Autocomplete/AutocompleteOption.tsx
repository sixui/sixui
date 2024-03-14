import stylex from '@stylexjs/stylex';
import { Fragment } from 'react';
import { Combobox } from '@headlessui/react';

import { type IListItemProps, ListItem } from '@/components/atoms/ListItem';

export type IAutocompleteOptionProps = Omit<IListItemProps, 'type'> & {
  value: string;
  label?: string;
  searchableText?: string | Array<string>;
  children?: React.ReactNode;
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
  const {
    sx,
    value,
    children,
    label,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    searchableText,
    ...other
  } = props;

  return (
    <Combobox.Option as={Fragment} disabled={props.disabled} value={value}>
      {({ active, selected }) => (
        <ListItem
          {...other}
          type='button'
          sx={[styles.host, props.disabled && styles.host$disabled, sx]}
          visualState={{ hovered: active }}
          selected={selected}
        >
          {children ?? label}
        </ListItem>
      )}
    </Combobox.Option>
  );
};
AutocompleteOption.displayName = 'AutocompleteOption';
