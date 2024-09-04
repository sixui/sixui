import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IStylesProps } from '~/utils/styles/useStyles';
import type { IBoxProps } from '../Box';
import type { indicatorStyles, IIndicatorStylesFactory } from './Indicator.css';

export type IIndicatorOwnProps = {
  children?: React.ReactNode;
  processing?: boolean;
};

export interface IIndicatorProps
  extends IBoxProps,
    IStylesProps<IIndicatorStylesFactory>,
    IIndicatorOwnProps {}

export type IIndicatorFactory = IComponentFactory<{
  props: IIndicatorProps;
  ref: HTMLDivElement;
  styles: typeof indicatorStyles;
}>;
