import type { IContainerProps } from '@/helpers/types';
import type { IAnchoredStyleKey } from './Anchored.styledefs';

export type IAnchoredProps = IContainerProps<IAnchoredStyleKey> & {
  verticalOrigin?: 'top' | 'bottom';
  horizontalOrigin?: 'left' | 'right';
  overlap?: 'rectangular' | 'circular';
  children: React.ReactNode;
  content?: React.ReactNode;
  invisible?: boolean;
};
