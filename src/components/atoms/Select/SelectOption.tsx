import stylex from '@stylexjs/stylex';
import { Fragment } from 'react';
import { Listbox } from '@headlessui/react';

import { type IListItemProps, ListItem } from '@/components/atoms/ListItem';

export type ISelectOptionProps = Omit<IListItemProps, 'as' | 'type'> & {
  as?: React.ElementType;
  value?: string;
  label?: string;
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
  const { sx, value, children, label, ...other } = props;

  return (
    <Listbox.Option
      as={Fragment}
      disabled={props.disabled}
      value={value}
      data-cy={`option-${value}`}
    >
      {({ active, selected }) => (
        <ListItem
          {...other}
          sx={[styles.host, props.disabled && styles.host$disabled, sx]}
          visualState={{ hovered: active }}
          selected={selected}
        >
          {children ?? label}
        </ListItem>
      )}
    </Listbox.Option>
  );
};
SelectOption.displayName = 'SelectOption';
