import type { IAppLayoutTopBarThemeFactory } from './AppLayoutTopBar.css';
import type { IAppLayoutTopBarFactory } from './AppLayoutTopBar.types';
import { Paper } from '~/components/Paper';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { useAppLayoutComponent } from '../hooks/useAppLayoutComponent';
import { COMPONENT_NAME } from './AppLayoutTopBar.constants';
import { appLayoutTopBarTheme } from './AppLayoutTopBar.css';

export const AppLayoutTopBar = componentFactory<IAppLayoutTopBarFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      children,
      divider,
      // DEV: use `wide` prop to set the width of the header to 100%
      // (eventually), and show the menu icon
      wide,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    useAppLayoutComponent('topBar');

    const { getStyles } = useComponentTheme<IAppLayoutTopBarThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: appLayoutTopBarTheme,
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

AppLayoutTopBar.theme = appLayoutTopBarTheme;
AppLayoutTopBar.displayName = `@sixui/core/${COMPONENT_NAME}`;
