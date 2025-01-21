import type { IAppLayoutFooterThemeFactory } from './AppLayoutFooter.css';
import type { IAppLayoutFooterFactory } from './AppLayoutFooter.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Paper } from '../Paper';
import { appLayoutFooterTheme } from './AppLayoutFooter.css';

const COMPONENT_NAME = 'AppLayoutFooter';

export const AppLayoutFooter = componentFactory<IAppLayoutFooterFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      children,
      divider,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<IAppLayoutFooterThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: appLayoutFooterTheme,
      modifiers: {
        'with-divider': divider,
      },
    });

    return (
      <Paper {...getStyles('root')} as="footer" ref={forwardedRef} {...other}>
        {children}
      </Paper>
    );
  },
);

AppLayoutFooter.theme = appLayoutFooterTheme;
AppLayoutFooter.displayName = `@sixui/${COMPONENT_NAME}`;
