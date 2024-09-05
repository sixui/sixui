import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IStylesProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { indicatorTheme, IIndicatorThemeFactory } from './Indicator.css';

export type IIndicatorOwnProps = {
  children?: React.ReactNode;
  processing?: boolean;
};

export interface IIndicatorProps
  extends IBoxProps,
    IStylesProps<IIndicatorThemeFactory>,
    IIndicatorOwnProps {}

export type IIndicatorFactory = IComponentFactory<{
  props: IIndicatorProps;
  ref: HTMLDivElement;
  theme: typeof indicatorTheme;
}>;
