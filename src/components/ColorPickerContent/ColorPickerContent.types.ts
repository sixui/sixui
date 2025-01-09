import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type {
  colorPickerContentTheme,
  IColorPickerContentThemeFactory,
} from './ColorPickerContent.css';

export type IColorPickerContentVariant = 'primary';

export interface IColorPickerContentOwnProps {
  children?: React.ReactNode;
  disabled?: boolean;
}

export interface IColorPickerContentProps
  extends IBoxProps,
    IComponentThemeProps<IColorPickerContentThemeFactory>,
    IColorPickerContentOwnProps {}

export type IColorPickerContentFactory = IComponentFactory<{
  props: IColorPickerContentProps;
  ref: HTMLDivElement;
  theme: typeof colorPickerContentTheme;
  variant: IColorPickerContentVariant | false;
}>;
