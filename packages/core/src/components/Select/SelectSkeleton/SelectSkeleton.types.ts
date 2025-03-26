import type { IBoxProps } from '~/components/Box';
import type { IFieldBaseSkeletonOwnProps } from '~/components/FieldBase';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type {
  ISelectSkeletonThemeFactory,
  selectSkeletonTheme,
} from './SelectSkeleton.css';

export type ISelectSkeletonOwnProps = IFieldBaseSkeletonOwnProps;

export interface ISelectSkeletonProps
  extends IBoxProps,
    IComponentThemeProps<ISelectSkeletonThemeFactory>,
    ISelectSkeletonOwnProps {}

export type ISelectSkeletonFactory = IComponentFactory<{
  props: ISelectSkeletonProps;
  ref: HTMLDivElement;
  theme: typeof selectSkeletonTheme;
}>;
