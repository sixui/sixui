import type { IAppLayoutBodyThemeFactory } from './AppLayoutBody.css';
import type { IAppLayoutBodyFactory } from './AppLayoutBody.types';
import { Paper } from '~/components/Paper';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { useAppLayoutContext } from '../AppLayout.context';
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
      orientation = 'horizontal',
      detached,
      fixedHeight,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const appLayoutContext = useAppLayoutContext();
    const hasTopBar = appLayoutContext?.components.includes('topBar');
    const hasSideNavigation =
      (appLayoutContext?.navigationMode === 'standard' &&
        appLayoutContext.components.includes('navigationDrawer') &&
        appLayoutContext.navigationDrawer?.state.opened) ||
      (appLayoutContext?.navigationMode === 'rail' &&
        appLayoutContext.components.includes('navigationRail'));
    const hasSideSheet = appLayoutContext?.sideSheet?.state.opened;

    const { getStyles } = useComponentTheme<IAppLayoutBodyThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: appLayoutBodyTheme,
    });

    return (
      <Paper
        as="main"
        {...getStyles('root', {
          modifiers: {
            orientation,
            detached,
            'with-top-bar': hasTopBar,
            'with-side-navigation': hasSideNavigation,
            'with-side-sheet': hasSideSheet,
            'fixed-height': fixedHeight,
          },
        })}
        ref={forwardedRef}
        {...other}
      >
        <div {...getStyles('inner')}>{children}</div>
      </Paper>
    );
  },
);

AppLayoutBody.displayName = `@sixui/core/${COMPONENT_NAME}`;
AppLayoutBody.theme = appLayoutBodyTheme;
