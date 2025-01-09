import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { IButtonBaseOwnProps } from '../ButtonBase';
import type { ColorTagIndicator } from '../ColorTagIndicator';
import type { colorTagTheme, IColorTagThemeFactory } from './ColorTag.css';

export interface IColorTagOwnProps extends IButtonBaseOwnProps {
  selected?: boolean;
  backgroundColor?: string;
  foregroundColor?: string;
}

export interface IColorTagProps
  extends IBoxProps,
    IComponentThemeProps<IColorTagThemeFactory>,
    IColorTagOwnProps {}

export type IColorTagFactory = IComponentFactory<{
  props: IColorTagProps;
  ref: HTMLDivElement;
  theme: typeof colorTagTheme;
  staticComponents: {
    Indicator: typeof ColorTagIndicator;
  };
}>;
