import type { IAppLayoutFooterThemeFactory } from './AppLayoutFooter.css';
import type { IAppLayoutFooterFactory } from './AppLayoutFooter.types';
import { Paper } from '~/components/Paper';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
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
        <div {...getStyles('inner')}>{children}</div>
      </Paper>
    );
  },
);

AppLayoutFooter.theme = appLayoutFooterTheme;
AppLayoutFooter.displayName = `@sixui/${COMPONENT_NAME}`;
