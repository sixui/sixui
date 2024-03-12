import stylex from '@stylexjs/stylex';
import { Fragment } from 'react';
import { Listbox } from '@headlessui/react';

import { type IListItemProps, ListItem } from '@/components/atoms/ListItem';

export type ISelectOptionProps = Omit<IListItemProps, 'type'> & {
  value: string;
  displayValue?: string;
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
  const { sx, value, displayValue, children, ...other } = props;

  return (
    <Listbox.Option as={Fragment} disabled={props.disabled} value={value}>
      {({ active }) => (
        <ListItem
          {...other}
          sx={[styles.host, props.disabled && styles.host$disabled, sx]}
          active={active}
        >
          {children ?? displayValue}
        </ListItem>
      )}
    </Listbox.Option>
  );
};
