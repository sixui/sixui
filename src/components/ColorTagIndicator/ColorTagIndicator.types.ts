import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { IPaperBaseOwnProps } from '../PaperBase';
import type {
  colorTagIndicatorTheme,
  IColorTagIndicatorThemeFactory,
} from './ColorTagIndicator.css';

export interface IColorTagIndicatorOwnProps extends IPaperBaseOwnProps {
  children?: React.ReactNode;
  label?: React.ReactNode;
  icon?: React.ReactNode;
  backgroundColor?: string;
  foregroundColor?: string;
}

export interface IColorTagIndicatorProps
  extends IBoxProps,
    IComponentThemeProps<IColorTagIndicatorThemeFactory>,
    IColorTagIndicatorOwnProps {}

export type IColorTagIndicatorFactory = IPolymorphicComponentFactory<{
  props: IColorTagIndicatorProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
  theme: typeof colorTagIndicatorTheme;
}>;
