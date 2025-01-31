import type { IBoxProps } from '~/components/Box';
import type { IDeterminateCircularProgressIndicatorOwnProps } from '~/components/DeterminateCircularProgressIndicator';
import type { IIndeterminateCircularProgressIndicatorOwnProps } from '~/components/IndeterminateCircularProgressIndicator';
import type { IComponentThemeProps } from '~/components/ThemeProvider';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IMakeOptional } from '~/utils/types';
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
