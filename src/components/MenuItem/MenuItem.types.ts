import type { IListItemOwnProps } from '~/components/ListItem';

export type IMenuItemProps = IListItemOwnProps &
  React.ComponentPropsWithoutRef<'button'> & {
    label: React.ReactNode;
    keepOpenOnClick?: boolean;
  };
