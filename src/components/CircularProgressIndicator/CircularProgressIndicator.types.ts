import type { IMakeOptional } from '~/helpers/types';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IStylesProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type {
  circularProgressIndicatorTheme,
  ICircularProgressIndicatorThemeFactory,
} from './CircularProgressIndicator.css';
import type { IIndeterminateCircularProgressIndicatorOwnProps } from '../IndeterminateCircularProgressIndicator';
import type { IDeterminateCircularProgressIndicatorOwnProps } from '../DeterminateCircularProgressIndicator';

export interface ICircularProgressIndicatorOwnProps
  extends IMakeOptional<IDeterminateCircularProgressIndicatorOwnProps, 'value'>,
    IIndeterminateCircularProgressIndicatorOwnProps {}

export interface ICircularProgressIndicatorProps
  extends IBoxProps,
    IStylesProps<ICircularProgressIndicatorThemeFactory>,
    ICircularProgressIndicatorOwnProps {}

export type ICircularProgressIndicatorFactory = IComponentFactory<{
  props: ICircularProgressIndicatorProps;
  ref: HTMLDivElement;
  theme: typeof circularProgressIndicatorTheme;
}>;
