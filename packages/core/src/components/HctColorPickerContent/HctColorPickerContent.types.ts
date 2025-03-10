import type { IBoxProps } from '~/components/Box';
import type { IColorPickerContentOwnProps } from '~/components/ColorPickerContent';
import type {
  colorPickerContentTheme,
  IColorPickerContentThemeFactory,
} from '~/components/ColorPickerContent/ColorPickerContent.css';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IOmit } from '~/utils/types';

export interface IHctColorPickerContentOwnProps
  extends IOmit<IColorPickerContentOwnProps, 'palettes'> {
  sourceColor?: string;
  hueCount?: number;
  tones?: Array<number>;
  hideNeutral?: boolean;
}

export interface IHctColorPickerContentProps
  extends IBoxProps,
    IComponentThemeProps<IColorPickerContentThemeFactory>,
    IHctColorPickerContentOwnProps {}

export type IHctColorPickerContentFactory = IComponentFactory<{
  props: IHctColorPickerContentProps;
  ref: HTMLDivElement;
  theme: typeof colorPickerContentTheme;
}>;
