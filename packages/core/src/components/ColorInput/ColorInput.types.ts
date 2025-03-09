import type { IBoxProps } from '~/components/Box';
import type { ITextInputOwnProps } from '~/components/TextInput';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type {
  IColorPalette,
  IMaybeAsync,
  IOmit,
  IPlacement,
} from '~/utils/types';
import type {
  colorInputFieldTheme,
  IColorInputThemeFactory,
} from './ColorInput.css';

export interface IColorInputColorPickerRendererProps {
  onClick: (event: React.MouseEvent, color: string) => IMaybeAsync<unknown>;
  selectedColor?: string;
  customPalette?: IColorPalette;
}

export interface IColorInputOwnProps
  extends IOmit<ITextInputOwnProps, 'onChange'> {
  placement?: IPlacement;
  colorPickerRenderer?: (
    props: IColorInputColorPickerRendererProps,
  ) => React.JSX.Element;
  customPalette?: IColorPalette;
  onColorsQuantized?: (colors: Array<string>) => void;
  quantizeColorCount?: number;
  onChange?: (color: string, isValid: boolean) => IMaybeAsync<unknown>;
}

export interface IColorInputProps
  extends IBoxProps,
    IComponentThemeProps<IColorInputThemeFactory>,
    IColorInputOwnProps {}

export type IColorInputFactory = IComponentFactory<{
  props: IColorInputProps;
  ref: HTMLInputElement;
  theme: typeof colorInputFieldTheme;
}>;
