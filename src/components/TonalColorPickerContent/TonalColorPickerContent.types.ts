import type {
  IColor,
  ICompiledStyles,
  IContainerProps,
  IZeroOrMore,
} from '@/helpers/types';
import type { ITonalColorPickerContentStylesKey } from './TonalColorPickerContent.styles';
import type { IColorSchemeVariant } from '@/components/ColorScheme';
import type { IPaperStylesKey } from '@/components/Paper';

export type ITonalColorPickerContentProps =
  IContainerProps<ITonalColorPickerContentStylesKey> & {
    innerStyles?: {
      paper?: IZeroOrMore<ICompiledStyles<IPaperStylesKey>>;
    };
    fixedColorScheme?: boolean;
    sourceColor?: IColor | Record<IColorSchemeVariant, IColor>;
    selectedColor?: IColor;
    customColors?: Array<IColor>;
  };
