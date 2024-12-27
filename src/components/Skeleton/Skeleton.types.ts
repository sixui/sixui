import type { IRange } from '~/helpers/types';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IPaperOwnProps } from '../Paper';
import type { ISkeletonThemeFactory, skeletonTheme } from './Skeleton.css';

export type ISkeletonVariant = 'rectangular' | 'circular' | 'overlay';

export interface ISkeletonOwnProps {
  children?: React.ReactNode;
  loaded?: boolean;
  animation?: 'pulse' | 'wave' | false;
  length?: number | IRange;
}

export interface ISkeletonProps
  extends IPaperOwnProps,
    IComponentThemeProps<ISkeletonThemeFactory>,
    ISkeletonOwnProps {}

export type ISkeletonFactory = IComponentFactory<{
  props: ISkeletonProps;
  ref: HTMLDivElement;
  theme: typeof skeletonTheme;
  variant: ISkeletonVariant | false;
}>;
