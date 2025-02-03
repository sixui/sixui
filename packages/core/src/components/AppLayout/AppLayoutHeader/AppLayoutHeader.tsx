import type { IAppLayoutHeaderThemeFactory } from './AppLayoutHeader.css';
import type { IAppLayoutHeaderFactory } from './AppLayoutHeader.types';
import { Paper } from '~/components/Paper';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { useAppLayoutComponent } from '../hooks/useAppLayoutComponent';
import { COMPONENT_NAME } from './AppLayoutHeader.constants';
import { appLayoutHeaderTheme } from './AppLayoutHeader.css';

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

    useAppLayoutComponent('header');

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
AppLayoutHeader.displayName = `@sixui/core/${COMPONENT_NAME}`;
