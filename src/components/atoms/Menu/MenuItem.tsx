import { Fragment } from 'react';
import { Menu as HeadlessMenu } from '@headlessui/react';

import { type IListItemProps, ListItem } from '@/components/atoms/ListItem';

export type IMenuItemProps = Omit<IListItemProps, 'as'> & {
  as?: React.ElementType;
  children: React.ReactNode;
};

export const MenuItem: React.FC<IMenuItemProps> = (props) => {
  const { children, ...other } = props;

  return (
    <HeadlessMenu.Item as={Fragment} disabled={props.disabled}>
      {({ active }) => (
        <ListItem {...other} selected={active}>
          {children}
        </ListItem>
      )}
    </HeadlessMenu.Item>
  );
};
