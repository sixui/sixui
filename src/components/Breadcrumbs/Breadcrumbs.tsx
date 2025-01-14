import type { IBreadcrumbsThemeFactory } from './Breadcrumbs.css';
import type { IBreadcrumbsFactory } from './Breadcrumbs.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Box } from '../Box';
import { breadcrumbsTheme } from './Breadcrumbs.css';

const COMPONENT_NAME = 'Breadcrumbs';

export const Breadcrumbs = componentFactory<IBreadcrumbsFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      children,
      expandText,
      itemCountBeforeCollapse,
      itemCountAfterCollapse,
      maxItems,
      separator,
      showTrailingSeparator,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<IBreadcrumbsThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: breadcrumbsTheme,
    });

    return (
      <Box {...getStyles('root')} ref={forwardedRef} {...other}>
        {children}
      </Box>
    );
  },
);

Breadcrumbs.theme = breadcrumbsTheme;
Breadcrumbs.displayName = `@sixui/${COMPONENT_NAME}`;
