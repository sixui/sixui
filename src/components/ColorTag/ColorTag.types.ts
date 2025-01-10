import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { IButtonBaseOwnProps } from '../ButtonBase';
import type {
  ColorTagIndicator,
  IColorTagIndicatorOwnProps,
} from '../ColorTagIndicator';
import type { colorTagTheme, IColorTagThemeFactory } from './ColorTag.css';

export interface IColorTagOwnProps
  extends IButtonBaseOwnProps,
    IColorTagIndicatorOwnProps {}

export interface IColorTagProps
  extends IBoxProps,
    IComponentThemeProps<IColorTagThemeFactory>,
    IColorTagOwnProps {}

export type IColorTagFactory = IPolymorphicComponentFactory<{
  props: IColorTagProps;
  defaultRef: HTMLButtonElement;
  defaultRoot: 'button';
  theme: typeof colorTagTheme;
  staticComponents: {
    Indicator: typeof ColorTagIndicator;
  };
}>;
