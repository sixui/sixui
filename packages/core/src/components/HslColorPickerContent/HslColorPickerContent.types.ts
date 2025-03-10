import type { IBoxProps } from '~/components/Box';
import type { IColorPickerContentOwnProps } from '~/components/ColorPickerContent';
import type {
  colorPickerContentTheme,
  IColorPickerContentThemeFactory,
} from '~/components/ColorPickerContent/ColorPickerContent.css';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IOmit } from '~/utils/types';

export interface IHslColorPickerContentOwnProps
  extends IOmit<IColorPickerContentOwnProps, 'palettes'> {
  hueCount?: number;
  saturation?: number;
  lightnesses?: Array<number>;
  hideNeutral?: boolean;
}

export interface IHslColorPickerContentProps
  extends IBoxProps,
    IComponentThemeProps<IColorPickerContentThemeFactory>,
    IHslColorPickerContentOwnProps {}

export type IHslColorPickerContentFactory = IComponentFactory<{
  props: IHslColorPickerContentProps;
  ref: HTMLDivElement;
  theme: typeof colorPickerContentTheme;
}>;
