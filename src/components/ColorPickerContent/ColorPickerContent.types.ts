import type { IMaybeAsync } from '~/helpers/types';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { IPaperBaseOwnProps } from '../PaperBase';
import type {
  colorPickerContentTheme,
  IColorPickerContentThemeFactory,
} from './ColorPickerContent.css';

export type IColorPalette = Array<string>;

export interface IColorPickerContentOwnProps {
  selectedColor?: string;
  onClick?: (
    event: React.MouseEvent<Element>,
    color: string,
  ) => IMaybeAsync<unknown>;
  customPalette?: IColorPalette;
  palettes: Array<IColorPalette>;
  children?: React.ReactNode;
}

export interface IColorPickerContentProps
  extends IBoxProps,
    IPaperBaseOwnProps,
    IComponentThemeProps<IColorPickerContentThemeFactory>,
    IColorPickerContentOwnProps {}

export type IColorPickerContentFactory = IComponentFactory<{
  props: IColorPickerContentProps;
  ref: HTMLDivElement;
  theme: typeof colorPickerContentTheme;
}>;
