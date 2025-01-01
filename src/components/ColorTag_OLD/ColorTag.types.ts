import type { IBaseProps } from '../Base';
import type { IColorTagStylesKey } from './ColorTag.styles';

export type IColorTagProps = IBaseProps<IColorTagStylesKey> & {
  children?: React.ReactNode;
  label?: React.ReactNode;
  icon?: React.ReactNode;
  backgroundColor?: string;
  foregroundColor?: string;
};
