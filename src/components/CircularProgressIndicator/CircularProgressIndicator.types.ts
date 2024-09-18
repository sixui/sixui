import type { IMakeOptional } from '~/helpers/types';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { IDeterminateCircularProgressIndicatorOwnProps } from '../DeterminateCircularProgressIndicator';
import type { IIndeterminateCircularProgressIndicatorOwnProps } from '../IndeterminateCircularProgressIndicator';
import type {
  circularProgressIndicatorTheme,
  ICircularProgressIndicatorThemeFactory,
} from './CircularProgressIndicator.css';

export interface ICircularProgressIndicatorOwnProps
  extends IMakeOptional<IDeterminateCircularProgressIndicatorOwnProps, 'value'>,
    IIndeterminateCircularProgressIndicatorOwnProps {}

export interface ICircularProgressIndicatorProps
  extends IBoxProps,
    IComponentThemeProps<ICircularProgressIndicatorThemeFactory>,
    ICircularProgressIndicatorOwnProps {}

export type ICircularProgressIndicatorFactory = IComponentFactory<{
  props: ICircularProgressIndicatorProps;
  ref: HTMLDivElement;
  theme: typeof circularProgressIndicatorTheme;
}>;
