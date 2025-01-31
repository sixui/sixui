import type { IBoxProps } from '~/components/Box';
import type { IPaperOwnProps } from '~/components/Paper';
import type { IComponentThemeProps } from '~/components/ThemeProvider';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IListContextValue } from './List.context';
import type { IListThemeFactory, listTheme } from './List.css';
import type { ListDivider } from './ListDivider';
import type { ListItem } from './ListItem';

export type IListVariant = 'primary';

export interface IListOwnProps extends IListContextValue, IPaperOwnProps {
  children?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  divider?: React.ReactNode;
  cols?: number;
}

export interface IListProps
  extends IBoxProps,
    IComponentThemeProps<IListThemeFactory>,
    IListOwnProps,
    IListOwnProps {}

export type IListFactory = IComponentFactory<{
  props: IListProps;
  ref: HTMLDivElement;
  theme: typeof listTheme;
  variant: IListVariant | false;
  staticComponents: {
    Item: typeof ListItem;
    Divider: typeof ListDivider;
  };
}>;
