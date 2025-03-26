import type { IBoxProps } from '~/components/Box';
import type { ISkeletonOwnProps } from '~/components/Skeleton';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type {
  fieldBaseSkeletonTheme,
  IFieldBaseSkeletonThemeFactory,
} from './FieldBaseSkeleton.css';

export type IFieldBaseSkeletonOwnProps = ISkeletonOwnProps;

export interface IFieldBaseSkeletonProps
  extends IBoxProps,
    IComponentThemeProps<IFieldBaseSkeletonThemeFactory>,
    IFieldBaseSkeletonOwnProps {}

export type IFieldBaseSkeletonFactory = IComponentFactory<{
  props: IFieldBaseSkeletonProps;
  ref: HTMLDivElement;
  theme: typeof fieldBaseSkeletonTheme;
}>;
