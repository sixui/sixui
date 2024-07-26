import type { IListItemOwnProps } from '~/components/ListItem';

export type IMenuItemProps = IListItemOwnProps &
  React.HTMLProps<HTMLButtonElement> & {
    label: React.ReactNode;
    keepOpenOnClick?: boolean;
  };
