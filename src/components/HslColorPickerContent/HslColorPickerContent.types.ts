import type { ICompiledStyles, IOmit, IZeroOrMore } from '~/helpers/types';
import type { IBaseProps } from '../Base';
import type {
  IColorPickerContentProps,
  IColorPickerContentStylesKey,
} from '../ColorPickerContent';

export type IHslColorPickerContentProps = IBaseProps &
  IOmit<IColorPickerContentProps, 'styles' | 'innerStyles' | 'palettes'> & {
    innerStyles?: IColorPickerContentProps['innerStyles'] & {
      colorPickerContent?: IZeroOrMore<
        ICompiledStyles<IColorPickerContentStylesKey>
      >;
    };
    hueCount?: number;
    saturation?: number;
    lightnesses?: Array<number>;
    hideNeutral?: boolean;
  };
