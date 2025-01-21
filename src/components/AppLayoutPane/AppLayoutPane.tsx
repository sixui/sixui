import type { IAppLayoutPaneThemeFactory } from './AppLayoutPane.css';
import type { IAppLayoutPaneFactory } from './AppLayoutPane.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Paper } from '../Paper';
import { appLayoutPaneTheme } from './AppLayoutPane.css';

const COMPONENT_NAME = 'AppLayoutPane';

// FIXME: delete component?

export const AppLayoutPane = componentFactory<IAppLayoutPaneFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      children,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<IAppLayoutPaneThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: appLayoutPaneTheme,
    });

    return (
      <Paper {...getStyles('root')} ref={forwardedRef} {...other}>
        {children}
      </Paper>
    );
  },
);

AppLayoutPane.theme = appLayoutPaneTheme;
AppLayoutPane.displayName = `@sixui/${COMPONENT_NAME}`;
