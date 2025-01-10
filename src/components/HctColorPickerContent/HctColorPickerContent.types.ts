import type { IOmit } from '~/helpers/types';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { IColorPickerContentOwnProps } from '../ColorPickerContent';
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
