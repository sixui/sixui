import type { IBoxProps } from '~/components/Box';
import type { IColorPickerContentOwnProps } from '~/components/ColorPickerContent';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IOmit } from '~/utils/types';
import type {
  hctColorPickerContentTheme,
  IHctColorPickerContentThemeFactory,
} from './HctColorPickerContent.css';

export interface IHctColorPickerContentOwnProps
  extends IOmit<IColorPickerContentOwnProps, 'palettes'> {
  sourceColor?: string;
  hueCount?: number;
  tones?: Array<number>;
  hideNeutral?: boolean;
}

export interface IHctColorPickerContentProps
  extends IBoxProps,
    IComponentThemeProps<IHctColorPickerContentThemeFactory>,
    IHctColorPickerContentOwnProps {}

export type IHctColorPickerContentFactory = IComponentFactory<{
  props: IHctColorPickerContentProps;
  ref: HTMLDivElement;
  theme: typeof hctColorPickerContentTheme;
}>;
