import type { ICompiledStyles, IZeroOrMore } from '~/helpers/types';
import type { IBaseProps } from '../Base';
import type { IColorPickerContentStylesKey } from './ColorPickerContent.styles';
import type { IPaperBaseStylesKey } from '../PaperBase';

export type IColorPickerContentProps =
  IBaseProps<IColorPickerContentStylesKey> & {
    innerStyles?: {
      paperBase?: IZeroOrMore<ICompiledStyles<IPaperBaseStylesKey>>;
    };
    selectedColor?: string;
    onClick?: (
      event: React.MouseEvent<HTMLButtonElement>,
      color: string,
    ) => void;
    customColors?: Array<string>;
    palettes: Array<Array<string>>;
    children?: React.ReactNode;
  };
