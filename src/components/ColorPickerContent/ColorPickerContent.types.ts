import type {
  ICompiledStyles,
  IContainerProps,
  IZeroOrMore,
} from '~/helpers/types';
import type { IColorPickerContentStylesKey } from './ColorPickerContent.styles';
import type { IPaperBaseStylesKey } from '~/components/PaperBase';

export type IColorPickerContentProps =
  IContainerProps<IColorPickerContentStylesKey> & {
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
