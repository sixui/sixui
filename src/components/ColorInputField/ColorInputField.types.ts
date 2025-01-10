import type { IMaybeAsync, IPlacement } from '~/helpers/types';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { IColorPalette } from '../ColorPickerContent';
import type { ITextInputFieldOwnProps } from '../TextInputField';
import type {
  colorInputFieldTheme,
  IColorInputFieldThemeFactory,
} from './ColorInputField.css';

export type IColorInputFieldColorPickerRendererProps = {
  onClick: (
    event: React.MouseEvent<Element>,
    color: string,
  ) => IMaybeAsync<unknown>;
  selectedColor?: string;
  customPalette?: IColorPalette;
};

export interface IColorInputFieldOwnProps extends ITextInputFieldOwnProps {
  placement?: IPlacement;
  colorPickerRenderer?: (
    props: IColorInputFieldColorPickerRendererProps,
  ) => React.JSX.Element;
  customPalette?: IColorPalette;
  onColorsQuantized?: (colors: Array<string>) => void;
  quantizeColorCount?: number;
}

export interface IColorInputFieldProps
  extends IBoxProps,
    IComponentThemeProps<IColorInputFieldThemeFactory>,
    IColorInputFieldOwnProps {}

export type IColorInputFieldFactory = IComponentFactory<{
  props: IColorInputFieldProps;
  ref: HTMLInputElement;
  theme: typeof colorInputFieldTheme;
}>;
