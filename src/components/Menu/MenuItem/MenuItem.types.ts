import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IListItemOwnProps } from '../../ListItem';
import type {
  listItemTheme,
  IListItemThemeFactory,
} from '../../ListItem/ListItem.css';

export interface IMenuItemOwnProps extends IListItemOwnProps {
  label: React.ReactNode;
  keepOpenOnClick?: boolean;
}

export interface IMenuItemProps
  extends IComponentThemeProps<IListItemThemeFactory>,
    IMenuItemOwnProps {}

export type IMenuItemFactory = IPolymorphicComponentFactory<{
  props: IMenuItemProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
  theme: typeof listItemTheme;
}>;
