import type { IContainerProps } from '@/helpers/types';
import type { IAnchoredStylesKey } from './Anchored.styles';

export type IAnchoredProps = IContainerProps<IAnchoredStylesKey> & {
  verticalOrigin?: 'top' | 'bottom';
  horizontalOrigin?: 'left' | 'right';
  overlap?: 'rectangular' | 'circular';
  children: React.ReactNode;
  content?: React.ReactNode;
  invisible?: boolean;
};
