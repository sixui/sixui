import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '~/components/Box';
import type { IPaperBaseOwnProps } from '~/components/PaperBase';
import type { IMenuListThemeFactory, menuListTheme } from './MenuList.css';

export interface IMenuListProps
  extends IBoxProps,
    IPaperBaseOwnProps,
    IComponentThemeProps<IMenuListThemeFactory> {}

export type IMenuListFactory = IPolymorphicComponentFactory<{
  props: IMenuListProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
  theme: typeof menuListTheme;
}>;
