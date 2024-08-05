import type { ICompiledStyles, IOmit, IZeroOrMore } from '~/helpers/types';
import type { IBaseProps } from '../Base';
import type {
  IColorPickerContentProps,
  IColorPickerContentStylesKey,
} from '../ColorPickerContent';

export type IHctColorPickerContentProps = IBaseProps &
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
