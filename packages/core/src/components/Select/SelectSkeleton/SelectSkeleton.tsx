import type { ISelectSkeletonThemeFactory } from './SelectSkeleton.css';
import type { ISelectSkeletonFactory } from './SelectSkeleton.types';
import { FieldBase } from '~/components/FieldBase';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './SelectSkeleton.constants';
import { selectSkeletonTheme } from './SelectSkeleton.css';

export const SelectSkeleton = componentFactory<ISelectSkeletonFactory>(
  (props, forwardedRef) => {
    const { classNames, className, styles, style, variant, ...other } =
      useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<ISelectSkeletonThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: selectSkeletonTheme,
    });

    return (
      <FieldBase.Skeleton
        {...getStyles('root')}
        ref={forwardedRef}
        {...other}
      />
    );
  },
);

SelectSkeleton.displayName = `@sixui/core/${COMPONENT_NAME}`;
SelectSkeleton.theme = selectSkeletonTheme;
