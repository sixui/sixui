import type { IContainerProps, IRange } from '~/helpers/types';
import type { ISkeletonStylesKey } from './Skeleton.styles';

export type ISkeletonProps = IContainerProps<ISkeletonStylesKey> & {
  children?: React.ReactNode;
  loaded?: boolean;
  variant?: 'rectangular' | 'circular' | 'overlay';
  animation?: 'pulse' | 'wave' | false;
  length?: number | IRange;
  hasError?: boolean;
};
