import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IBoxProps } from '../Box';
import type { IStylesProps } from '~/utils/styles/useStyles';
import type {
  circularProgressIndicatorStyles,
  ICircularProgressIndicatorStylesFactory,
} from './CircularProgressIndicator.css';
import type { IIndeterminateCircularProgressIndicatorOwnProps } from '../IndeterminateCircularProgressIndicator';
import type { IDeterminateCircularProgressIndicatorOwnProps } from '../DeterminateCircularProgressIndicator';
import { IMakeOptional } from '~/helpers/types';

export interface ICircularProgressIndicatorOwnProps
  extends IMakeOptional<IDeterminateCircularProgressIndicatorOwnProps, 'value'>,
    IIndeterminateCircularProgressIndicatorOwnProps {}

export interface ICircularProgressIndicatorProps
  extends IBoxProps,
    IStylesProps<ICircularProgressIndicatorStylesFactory>,
    ICircularProgressIndicatorOwnProps {}

export type ICircularProgressIndicatorFactory = IComponentFactory<{
  props: ICircularProgressIndicatorProps;
  ref: HTMLDivElement;
  styles: typeof circularProgressIndicatorStyles;
}>;
