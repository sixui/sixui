import type { IBoxProps } from '~/components/Box';
import type { IColorPalette } from '~/components/ColorPickerContent';
import type { ITextInputFieldOwnProps } from '~/components/TextInputField';
import type { IMaybeAsync, IOmit, IPlacement } from '~/helpers/types';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type {
  colorInputFieldTheme,
  IColorInputFieldThemeFactory,
} from './ColorInputField.css';

export interface IColorInputFieldColorPickerRendererProps {
  onClick: (
    event: React.MouseEvent<Element>,
    color: string,
  ) => IMaybeAsync<unknown>;
  selectedColor?: string;
  customPalette?: IColorPalette;
}

export interface IColorInputFieldOwnProps
  extends IOmit<ITextInputFieldOwnProps, 'onChange'> {
  placement?: IPlacement;
  colorPickerRenderer?: (
    props: IColorInputFieldColorPickerRendererProps,
  ) => React.JSX.Element;
  customPalette?: IColorPalette;
  onColorsQuantized?: (colors: Array<string>) => void;
  quantizeColorCount?: number;
  onChange?: (color: string, isValid: boolean) => IMaybeAsync<unknown>;
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
