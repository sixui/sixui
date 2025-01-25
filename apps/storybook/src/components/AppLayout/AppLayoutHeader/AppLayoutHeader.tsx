import type { IAppLayoutHeaderThemeFactory } from './AppLayoutHeader.css';
import type { IAppLayoutHeaderFactory } from './AppLayoutHeader.types';
import { Paper } from '~/components/Paper';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { appLayoutHeaderTheme } from './AppLayoutHeader.css';

const COMPONENT_NAME = 'AppLayoutHeader';

export const AppLayoutHeader = componentFactory<IAppLayoutHeaderFactory>(
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

    const { getStyles } = useComponentTheme<IAppLayoutHeaderThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: appLayoutHeaderTheme,
      modifiers: {
        'with-divider': divider,
      },
    });

    return (
      <Paper {...getStyles('root')} as="header" ref={forwardedRef} {...other}>
        {children}
      </Paper>
    );
  },
);

AppLayoutHeader.theme = appLayoutHeaderTheme;
AppLayoutHeader.displayName = `@sixui/${COMPONENT_NAME}`;
