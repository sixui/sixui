import type { IBoxProps } from '~/components/Box';
import type { ITextInputControlOwnProps } from '~/components/TextInput';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type {
  IColorPalette,
  IMaybeAsync,
  IOmit,
  IPlacement,
} from '~/utils/types';
import {
  type colorInputControlTheme,
  type IColorInputControlThemeFactory,
} from './ColorInputControl.css';

export interface IColorInputControlColorPickerRendererProps {
  onClick: (event: React.MouseEvent, color: string) => IMaybeAsync<unknown>;
  selectedColor?: string;
  customPalette?: IColorPalette;
}

export interface IColorInputControlOwnProps
  extends IOmit<ITextInputControlOwnProps, 'onChange'> {
  placement?: IPlacement;
  colorPickerRenderer?: (
    props: IColorInputControlColorPickerRendererProps,
  ) => React.JSX.Element;
  customPalette?: IColorPalette;
  onColorsQuantized?: (colors: Array<string>) => void;
  quantizeColorCount?: number;
  onChange?: (color: string, isValid: boolean) => IMaybeAsync<unknown>;
}

export interface IColorInputControlProps
  extends IBoxProps,
    IComponentThemeProps<IColorInputControlThemeFactory>,
    IColorInputControlOwnProps {}

export type IColorInputControlFactory = IComponentFactory<{
  props: IColorInputControlProps;
  ref: HTMLInputElement;
  theme: typeof colorInputControlTheme;
}>;
