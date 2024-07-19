import type { IContainerProps } from '@/helpers/types';
import type { ITonalColorPickerContentStylesKey } from './TonalColorPickerContent.styles';
import type { IColorSchemeVariant } from '../ColorScheme';

export type ITonalColorPickerContentProps =
  IContainerProps<ITonalColorPickerContentStylesKey> & {
    fixedColorScheme?: boolean;
    primaryColor?: string | Record<IColorSchemeVariant, string>;
    selectedColor?: string;
    customColors?: Array<string>;
  };
