import type { IAppLayoutBodyThemeFactory } from './AppLayoutBody.css';
import type { IAppLayoutBodyFactory } from './AppLayoutBody.types';
import { useAppLayoutContext } from '~/components/AppLayout/AppLayout.context';
import { Paper } from '~/components/Paper';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './AppLayoutBody.constants';
import { appLayoutBodyTheme } from './AppLayoutBody.css';

export const AppLayoutBody = componentFactory<IAppLayoutBodyFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      children,
      hasTopBar: hasTopBarProp,
      orientation = 'horizontal',
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const appLayoutContext = useAppLayoutContext();
    const hasTopBar =
      hasTopBarProp ?? appLayoutContext?.components.includes('topBar');

    const { getStyles } = useComponentTheme<IAppLayoutBodyThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: appLayoutBodyTheme,
      modifiers: {
        orientation,
        'with-top-bar': hasTopBar,
      },
    });

    return (
      <Paper as="main" {...getStyles('root')} ref={forwardedRef} {...other}>
        {children}
      </Paper>
    );
  },
);

AppLayoutBody.theme = appLayoutBodyTheme;
AppLayoutBody.displayName = `@sixui/core/${COMPONENT_NAME}`;
