import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { IPaperOwnProps } from '../Paper';
import type { listTheme, IListThemeFactory } from './List.css';
import type { IListContextValue } from './List.context';

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
}>;
