import type { IBoxProps } from '~/components/Box';
import type { ITextInputControlOwnProps } from '~/components/TextInput';
import type {
  ITextInputControlThemeFactory,
  textInputControlTheme,
} from '~/components/TextInput/TextInputControl/TextInputControl.css';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type {
  IColorPalette,
  IMaybeAsync,
  IOmit,
  IPlacement,
} from '~/utils/types';

export interface IColorInputColorPickerRendererProps {
  onClick: (event: React.MouseEvent, color: string) => IMaybeAsync<unknown>;
  selectedColor?: string;
  customPalette?: IColorPalette;
}

export interface IColorInputOwnProps
  extends IOmit<ITextInputControlOwnProps, 'onChange'> {
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
    IComponentThemeProps<ITextInputControlThemeFactory>,
    IColorInputOwnProps {}

export type IColorInputFactory = IComponentFactory<{
  props: IColorInputProps;
  ref: HTMLInputElement;
  theme: typeof textInputControlTheme;
}>;
