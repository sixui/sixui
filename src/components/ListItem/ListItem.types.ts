import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { IButtonBaseOwnProps } from '../ButtonBase';
import type { IItemOwnProps } from '../Item';
import type { IPaperOwnProps } from '../Paper';
import type { IListItemThemeFactory, listItemTheme } from './ListItem.css';

export type IListItemVariant = 'standard' | 'danger';

export interface IListItemOwnProps
  extends IItemOwnProps,
    IPaperOwnProps,
    IButtonBaseOwnProps {
  selected?: boolean;
  leading?: React.ReactNode;
  leadingIcon?: React.ReactNode;
  leadingImage?: string;
  leadingVideo?: Array<{ type: string; src: string }>;
  trailing?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  noFocusRing?: boolean;
  lineClamp?: number;
}

export interface IListItemProps
  extends IBoxProps,
    IComponentThemeProps<IListItemThemeFactory>,
    IListItemOwnProps {}

export type IListItemFactory = IPolymorphicComponentFactory<{
  props: IListItemProps;
  defaultRef: HTMLButtonElement;
  defaultRoot: 'button';
  theme: typeof listItemTheme;
  variant: IListItemVariant;
}>;
