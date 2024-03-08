import { Menu as HeadlessMenu } from '@headlessui/react';

import { IListItemProps, ListItem } from '@/components/atoms/ListItem';

export type IMenuItemProps = IListItemProps & {
  children: React.ReactNode;
};

export const MenuItem: React.FC<IMenuItemProps> = (props) => {
  const { children, ...other } = props;

  return (
    <HeadlessMenu.Item disabled={props.disabled}>
      {({ active }) => (
        <ListItem {...other} active={active}>
          {children}
        </ListItem>
      )}
    </HeadlessMenu.Item>
  );
};
