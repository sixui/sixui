import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { ISkeletonThemeFactory, skeletonTheme } from './Skeleton.css';

export interface ISkeletonOwnProps {
  children?: React.ReactNode;
  disabled?: boolean;
}

export interface ISkeletonProps
  extends IBoxProps,
    IComponentThemeProps<ISkeletonThemeFactory>,
    ISkeletonOwnProps {}

export type ISkeletonFactory = IComponentFactory<{
  props: ISkeletonProps;
  ref: HTMLDivElement;
  theme: typeof skeletonTheme;
}>;
