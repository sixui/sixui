import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IStylesProps } from '~/utils/styles/useStyles';
import type { IBoxProps } from '../Box';
import type {
  circularProgressIndicatorStyles,
  ICircularProgressIndicatorStylesFactory,
} from './CircularProgressIndicator.css';

export interface ICircularProgressIndicatorProps
  extends IBoxProps,
    IStylesProps<ICircularProgressIndicatorStylesFactory> {}

export type ICircularProgressIndicatorFactory = IComponentFactory<{
  props: ICircularProgressIndicatorProps;
  ref: HTMLDivElement;
  styles: typeof circularProgressIndicatorStyles;
}>;
