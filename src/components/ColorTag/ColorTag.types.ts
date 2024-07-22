import type { IContainerProps } from '@/helpers/types';
import type { IColorTagStylesKey } from './ColorTag.styles';

export type IColorTagProps = IContainerProps<IColorTagStylesKey> & {
  children?: React.ReactNode;
  label?: React.ReactNode;
  icon?: React.ReactNode;
  backgroundColor?: string;
  foregroundColor?: string;
};
