import type { IBoxProps } from '~/components/Box';
import type { IColorPickerContentOwnProps } from '~/components/ColorPickerContent';
import type { IComponentThemeProps } from '~/components/ThemeProvider';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IOmit } from '~/utils/types';
import type {
  hslColorPickerContentTheme,
  IHslColorPickerContentThemeFactory,
} from './HslColorPickerContent.css';

export interface IHslColorPickerContentOwnProps
  extends IOmit<IColorPickerContentOwnProps, 'palettes'> {
  hueCount?: number;
  saturation?: number;
  lightnesses?: Array<number>;
  hideNeutral?: boolean;
}

export interface IHslColorPickerContentProps
  extends IBoxProps,
    IComponentThemeProps<IHslColorPickerContentThemeFactory>,
    IHslColorPickerContentOwnProps {}

export type IHslColorPickerContentFactory = IComponentFactory<{
  props: IHslColorPickerContentProps;
  ref: HTMLDivElement;
  theme: typeof hslColorPickerContentTheme;
}>;
