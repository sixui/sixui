import type { IBoxProps } from '~/components/Box';
import type { IListItemOwnProps } from '~/components/List/ListItem';
import type {
  IListItemThemeFactory,
  listItemTheme,
} from '~/components/List/ListItem/ListItem.css';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';

export interface IMenuItemOwnProps extends IListItemOwnProps {
  label: React.ReactNode;
  keepOpenOnClick?: boolean;
}

export interface IMenuItemProps
  extends IBoxProps,
    IComponentThemeProps<IListItemThemeFactory>,
    IMenuItemOwnProps {}

export type IMenuItemFactory = IPolymorphicComponentFactory<{
  props: IMenuItemProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
  theme: typeof listItemTheme;
}>;
