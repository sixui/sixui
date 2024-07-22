import type {
  ICompiledStyles,
  IContainerProps,
  IOmit,
  IZeroOrMore,
} from '@/helpers/types';
import type {
  IColorPickerContentProps,
  IColorPickerContentStylesKey,
} from '@/components/ColorPickerContent';

export type IHslColorPickerContentProps = IContainerProps<never> &
  IOmit<IColorPickerContentProps, 'styles' | 'innerStyles' | 'palettes'> & {
    innerStyles?: IColorPickerContentProps['innerStyles'] & {
      colorPickerContent?: IZeroOrMore<
        ICompiledStyles<IColorPickerContentStylesKey>
      >;
    };
    hueCount?: number;
    saturation?: number;
    lightnesses?: Array<number>;
    noGrayscale?: boolean;
  };
