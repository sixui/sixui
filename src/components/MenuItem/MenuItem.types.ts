import type { IBoxProps } from '~/components/Box';
import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IListItemOwnProps } from '../ListItem';
import type {
  IListItemThemeFactory,
  listItemTheme,
} from '../ListItem/ListItem.css';

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
