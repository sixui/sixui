import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { ITestThemeFactory, testTheme } from './Test.css';

export interface ITestOwnProps<TItem extends object> {
  items: Array<TItem>;
  itemRenderer: (items: TItem) => React.ReactNode;
}

export interface ITestProps<TItem extends object>
  extends IBoxProps,
    IComponentThemeProps<ITestThemeFactory>,
    ITestOwnProps<TItem> {}

export type ITestFactory = IComponentFactory<{
  props: ITestProps<{
    name: string;
  }>;
  ref: HTMLUListElement;
  theme: typeof testTheme;
}>;
