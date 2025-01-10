import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type {
  colorInputFieldTheme,
  IColorInputFieldThemeFactory,
} from './ColorInputField.css';

export interface IColorInputFieldOwnProps {
  children?: React.ReactNode;
  disabled?: boolean;
}

export interface IColorInputFieldProps
  extends IBoxProps,
    IComponentThemeProps<IColorInputFieldThemeFactory>,
    IColorInputFieldOwnProps {}

export type IColorInputFieldFactory = IComponentFactory<{
  props: IColorInputFieldProps;
  ref: HTMLDivElement;
  theme: typeof colorInputFieldTheme;
}>;
