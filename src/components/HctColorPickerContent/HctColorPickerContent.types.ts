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

export type IHctColorPickerContentProps = IContainerProps &
  IOmit<IColorPickerContentProps, 'styles' | 'innerStyles' | 'palettes'> & {
    innerStyles?: IColorPickerContentProps['innerStyles'] & {
      colorPickerContent?: IZeroOrMore<
        ICompiledStyles<IColorPickerContentStylesKey>
      >;
    };
    sourceColor?: string;
    hueCount?: number;
    tones?: Array<number>;
    hideNeutral?: boolean;
  };
