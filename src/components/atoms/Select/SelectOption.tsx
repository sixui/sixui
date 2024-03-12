import { Fragment } from 'react';
import { Listbox } from '@headlessui/react';

import { type IListItemProps, ListItem } from '@/components/atoms/ListItem';

export type ISelectOptionProps = Omit<IListItemProps, 'type'> & {
  value: string;
  displayValue?: string;
  children?: React.ReactNode;
};

export const SelectOption: React.FC<ISelectOptionProps> = (props) => {
  const { value, displayValue, children, ...other } = props;

  return (
    <Listbox.Option as={Fragment} disabled={props.disabled} value={value}>
      {({ active }) => (
        <ListItem {...other} active={active}>
          {children ?? displayValue}
        </ListItem>
      )}
    </Listbox.Option>
  );
};
