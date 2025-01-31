import type { IPaperOwnProps } from '~/components/Paper';
import type { IComponentThemeProps } from '~/components/ThemeProvider';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IRange } from '~/utils/types';
import type { ISkeletonThemeFactory, skeletonTheme } from './Skeleton.css';
import { IBoxProps } from '~/components/Box';

export type ISkeletonVariant = 'rectangular' | 'circular' | 'overlay';

export interface ISkeletonOwnProps extends IPaperOwnProps {
  children?: React.ReactNode;
  loaded?: boolean;
  animation?: 'pulse' | 'wave' | false;
  length?: number | IRange;
}

export interface ISkeletonProps
  extends IBoxProps,
    IComponentThemeProps<ISkeletonThemeFactory>,
    ISkeletonOwnProps {}

export type ISkeletonFactory = IComponentFactory<{
  props: ISkeletonProps;
  ref: HTMLDivElement;
  theme: typeof skeletonTheme;
  variant: ISkeletonVariant | false;
}>;
