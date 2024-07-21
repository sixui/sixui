import type {
  IColor,
  ICompiledStyles,
  IContainerProps,
  IZeroOrMore,
} from '@/helpers/types';
import type { ITonalColorPickerContentStylesKey } from './TonalColorPickerContent.styles';
import type { IPaperBaseStylesKey } from '@/components/PaperBase';

export type ITonalColorPickerContentProps =
  IContainerProps<ITonalColorPickerContentStylesKey> & {
    innerStyles?: {
      paperBase?: IZeroOrMore<ICompiledStyles<IPaperBaseStylesKey>>;
    };
    sourceColor?: IColor;
    selectedColor?: IColor;
    customColors?: Array<IColor>;
    onClick?: (
      event: React.MouseEvent<HTMLButtonElement>,
      colorHex: string,
    ) => void;
    palettesCount?: number;
    tones?: Array<number>;
    children?: React.ReactNode;
  };
