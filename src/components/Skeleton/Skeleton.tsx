import type { ISkeletonThemeFactory } from './Skeleton.css';
import type { ISkeletonFactory } from './Skeleton.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Box } from '../Box';
import { skeletonTheme } from './Skeleton.css';

const COMPONENT_NAME = 'Skeleton';

export const Skeleton = componentFactory<ISkeletonFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      children,
      disabled,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<ISkeletonThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: skeletonTheme,
      modifiers: {
        disabled,
      },
    });

    return (
      <Box {...getStyles('root')} ref={forwardedRef} {...other}>
        {children}
      </Box>
    );
  },
);

Skeleton.theme = skeletonTheme;
Skeleton.displayName = `@sixui/${COMPONENT_NAME}`;
