import type { IBoxProps } from '~/components/Box';
import type { IPaperOwnProps } from '~/components/Paper';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type {
  colorTagIndicatorTheme,
  IColorTagIndicatorThemeFactory,
} from './ColorTagIndicator.css';

export interface IColorTagIndicatorOwnProps extends IPaperOwnProps {
  children?: React.ReactNode;
  color?: string;
  outlined?: boolean;
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
