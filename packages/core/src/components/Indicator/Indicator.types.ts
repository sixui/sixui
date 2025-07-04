import type { IBoxProps } from '~/components/Box';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IIndicatorThemeFactory, indicatorTheme } from './Indicator.css';

export interface IIndicatorOwnProps {
  children?: React.ReactNode;
  processing?: boolean;
}

export interface IIndicatorProps
  extends IBoxProps,
    IComponentThemeProps<IIndicatorThemeFactory>,
    IIndicatorOwnProps {}

export type IIndicatorFactory = IPolymorphicComponentFactory<{
  props: IIndicatorProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
  theme: typeof indicatorTheme;
}>;
