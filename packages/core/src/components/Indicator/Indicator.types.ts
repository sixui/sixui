import type { IBoxProps } from '~/components/Box';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IIndicatorThemeFactory, indicatorTheme } from './Indicator.css';

export interface IIndicatorOwnProps {
  children?: React.ReactNode;
  processing?: boolean;
}

export interface IIndicatorProps
  extends IBoxProps,
    IComponentThemeProps<IIndicatorThemeFactory>,
    IIndicatorOwnProps {}

export type IIndicatorFactory = IComponentFactory<{
  props: IIndicatorProps;
  ref: HTMLDivElement;
  theme: typeof indicatorTheme;
}>;
