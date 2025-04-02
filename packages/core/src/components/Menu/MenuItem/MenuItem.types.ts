import type { IBoxProps } from '~/components/Box';
import type { IListItemButtonOwnProps } from '~/components/List/ListItemButton';
import type {
  IListItemButtonThemeFactory,
  listItemButtonTheme,
} from '~/components/List/ListItemButton/ListItemButton.css';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';

export interface IMenuItemOwnProps extends IListItemButtonOwnProps {
  label: React.ReactNode;
  keepOpenOnClick?: boolean;
}

export interface IMenuItemProps
  extends IBoxProps,
    IComponentThemeProps<IListItemButtonThemeFactory>,
    IMenuItemOwnProps {}

export type IMenuItemFactory = IPolymorphicComponentFactory<{
  props: IMenuItemProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
  theme: typeof listItemButtonTheme;
}>;
