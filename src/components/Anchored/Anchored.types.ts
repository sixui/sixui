import type { IBaseProps } from '../Base';
import type { IAnchoredStylesKey } from './Anchored.styles';

export type IAnchoredProps = IBaseProps<IAnchoredStylesKey> & {
  verticalOrigin?: 'top' | 'bottom';
  horizontalOrigin?: 'left' | 'right';
  overlap?: 'rectangular' | 'circular';
  children: React.ReactNode;
  content?: React.ReactNode;
  invisible?: boolean;
};
