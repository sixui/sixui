import type { IContainerProps, IRange } from '@/helpers/types';
import type { ISkeletonStyleKey } from './Skeleton.styledefs';

export type ISkeletonProps = IContainerProps<ISkeletonStyleKey> & {
  children?: React.ReactNode;
  loaded?: boolean;
  variant?: 'rectangular' | 'circular' | 'overlay';
  animation?: 'pulse' | 'wave' | false;
  length?: number | IRange;
  hasError?: boolean;
};
