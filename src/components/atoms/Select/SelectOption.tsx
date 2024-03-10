import { Listbox } from '@headlessui/react';

import { IListItemProps, ListItem } from '@/components/atoms/ListItem';

export type ISelectOptionProps = IListItemProps & {
  children: React.ReactNode;
};

export const SelectOption: React.FC<ISelectOptionProps> = (props) => {
  const { children, ...other } = props;

  return (
    <Listbox.Option disabled={props.disabled} value='X'>
      {({ active }) => (
        <ListItem {...other} active={active}>
          {children}
        </ListItem>
      )}
    </Listbox.Option>
  );
};
