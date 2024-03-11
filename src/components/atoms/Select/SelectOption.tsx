import { Fragment } from 'react';
import { Listbox } from '@headlessui/react';

import { IListItemProps, ListItem } from '@/components/atoms/ListItem';

export type ISelectOptionProps = Omit<IListItemProps, 'type'> & {
  children: React.ReactNode;
  value: string;
};

export const SelectOption: React.FC<ISelectOptionProps> = (props) => {
  const { children, value, ...other } = props;

  return (
    <Listbox.Option as={Fragment} disabled={props.disabled} value={value}>
      {({ active }) => (
        <ListItem {...other} active={active}>
          {children}
        </ListItem>
      )}
    </Listbox.Option>
  );
};
