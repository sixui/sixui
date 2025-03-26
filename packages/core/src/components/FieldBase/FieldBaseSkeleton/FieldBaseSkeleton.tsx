import type { IFieldBaseSkeletonThemeFactory } from './FieldBaseSkeleton.css';
import type { IFieldBaseSkeletonFactory } from './FieldBaseSkeleton.types';
import { Skeleton } from '~/components/Skeleton';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './FieldBaseSkeleton.constants';
import { fieldBaseSkeletonTheme } from './FieldBaseSkeleton.css';

export const FieldBaseSkeleton = componentFactory<IFieldBaseSkeletonFactory>(
  (props, forwardedRef) => {
    const { classNames, className, styles, style, variant, ...other } =
      useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<IFieldBaseSkeletonThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: fieldBaseSkeletonTheme,
    });

    return <Skeleton {...getStyles('root')} ref={forwardedRef} {...other} />;
  },
);

FieldBaseSkeleton.displayName = `@sixui/core/${COMPONENT_NAME}`;
FieldBaseSkeleton.theme = fieldBaseSkeletonTheme;
