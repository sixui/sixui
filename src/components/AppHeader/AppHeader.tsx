import type { IAppHeaderThemeFactory } from './AppHeader.css';
import type { IAppHeaderFactory } from './AppHeader.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Paper } from '../Paper';
import { appHeaderTheme } from './AppHeader.css';

const COMPONENT_NAME = 'AppHeader';

export const AppHeader = componentFactory<IAppHeaderFactory>(
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

    const { getStyles } = useComponentTheme<IAppHeaderThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: appHeaderTheme,
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

AppHeader.theme = appHeaderTheme;
AppHeader.displayName = `@sixui/${COMPONENT_NAME}`;
