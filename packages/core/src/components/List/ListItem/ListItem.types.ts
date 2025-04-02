import type { IBoxProps } from '~/components/Box';
import type { IItemOwnProps } from '~/components/Item';
import type { IPaperOwnProps } from '~/components/Paper';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IMaybeAsync } from '~/utils/types';
import type { IListItemThemeFactory, listItemTheme } from './ListItem.css';

export interface IListItemOwnProps extends IItemOwnProps, IPaperOwnProps {
  selected?: boolean;
  active?: boolean;
  loading?: boolean;
  leading?: React.ReactNode;
  leadingIcon?: React.ReactNode;
  leadingImage?: string;
  leadingVideo?: Array<{ type: string; src: string }>;
  trailing?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  onClick?: (event: React.MouseEvent) => IMaybeAsync<unknown>;
  hoverable?: boolean;
}

export interface IListItemProps
  extends IBoxProps,
    IComponentThemeProps<IListItemThemeFactory>,
    IListItemOwnProps {}

export type IListItemFactory = IPolymorphicComponentFactory<{
  props: IListItemProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
  theme: typeof listItemTheme;
}>;
