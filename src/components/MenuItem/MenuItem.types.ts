import type { IListItemProps } from '../ListItem';

export type IMenuItemProps = IListItemProps &
  React.ComponentPropsWithoutRef<'button'> & {
    label: React.ReactNode;
    keepOpenOnClick?: boolean;
  };
