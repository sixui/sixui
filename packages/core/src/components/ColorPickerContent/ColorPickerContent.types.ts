import type { IBoxProps } from '~/components/Box';
import type { IPaperBaseOwnProps } from '~/components/PaperBase';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IColorPalette, IMaybeAsync } from '~/utils/types';
import type {
  colorPickerContentTheme,
  IColorPickerContentThemeFactory,
} from './ColorPickerContent.css';

export interface IColorPickerContentOwnProps extends IPaperBaseOwnProps {
  selectedColor?: string;
  onClick?: (event: React.MouseEvent, color: string) => IMaybeAsync<unknown>;
  customPalette?: IColorPalette;
  palettes: Array<IColorPalette>;
  children?: React.ReactNode;
}

export interface IColorPickerContentProps
  extends IBoxProps,
    IComponentThemeProps<IColorPickerContentThemeFactory>,
    IColorPickerContentOwnProps {}

export type IColorPickerContentFactory = IComponentFactory<{
  props: IColorPickerContentProps;
  ref: HTMLDivElement;
  theme: typeof colorPickerContentTheme;
}>;
