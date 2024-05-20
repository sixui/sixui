import stylex from '@stylexjs/stylex';
import { Fragment } from 'react';
import { Combobox as Autocomplete } from '@headlessui/react';

import { type IListItemProps, ListItem } from '@/components/atoms/ListItem';

export type IComboboxOptionProps = Omit<IListItemProps, 'as' | 'type'> & {
  as?: React.ElementType;
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

export const ComboboxOption: React.FC<IComboboxOptionProps> = (props) => {
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
    <Autocomplete.Option as={Fragment} disabled={props.disabled} value={value}>
      {({ active, selected }) => (
        <ListItem
          {...other}
          sx={[styles.host, props.disabled && styles.host$disabled, sx]}
          visualState={{ hovered: active }}
          selected={selected}
          data-cy={`comboboxOption-${value}`}
        >
          {children ?? label}
        </ListItem>
      )}
    </Autocomplete.Option>
  );
};
ComboboxOption.displayName = 'ComboboxOption';
