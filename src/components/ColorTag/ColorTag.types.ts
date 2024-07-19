import type { IColor, IContainerProps } from '@/helpers/types';
import type { IColorTagStylesKey } from './ColorTag.styles';

export const COLOR_BUTTON_DEFAULT_TAG = 'button';

export type IColorTagProps = IContainerProps<IColorTagStylesKey> & {
  children?: React.ReactNode;
  label?: React.ReactNode;
  icon?: React.ReactNode;
  backgroundColor?: IColor;
  foregroundColor?: IColor;
};
