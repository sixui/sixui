import type { IListItemOwnProps } from '../ListItem';

export type IMenuItemProps = IListItemOwnProps &
  React.ComponentPropsWithoutRef<'button'> & {
    label: React.ReactNode;
    keepOpenOnClick?: boolean;
  };
