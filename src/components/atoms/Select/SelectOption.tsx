import stylex from '@stylexjs/stylex';
import { Fragment } from 'react';
import { Listbox } from '@headlessui/react';

import { type IListItemProps, ListItem } from '@/components/atoms/ListItem';

export type ISelectOptionProps = Omit<IListItemProps, 'type'> & {
  value: string;
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

export const SelectOption: React.FC<ISelectOptionProps> = (props) => {
  const { sx, value, children, ...other } = props;

  return (
    <Listbox.Option as={Fragment} disabled={props.disabled} value={value}>
      {({ active, selected }) => (
        <ListItem
          {...other}
          type='button'
          sx={[styles.host, props.disabled && styles.host$disabled, sx]}
          visualState={{ hovered: active }}
          selected={selected}
        >
          {children}
        </ListItem>
      )}
    </Listbox.Option>
  );
};
SelectOption.displayName = 'SelectOption';
