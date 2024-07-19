import type { IContainerProps } from '@/helpers/types';
import type { IColorPickerContentStylesKey } from './ColorPickerContent.styles';
import type { IColorSchemeVariant } from '../ColorScheme';

export type IColorPickerContentProps =
  IContainerProps<IColorPickerContentStylesKey> & {
    fixedColorScheme?: boolean;
    sourceColor?: string | Record<IColorSchemeVariant, string>;
    layer?: 'background' | 'foreground';
  };
