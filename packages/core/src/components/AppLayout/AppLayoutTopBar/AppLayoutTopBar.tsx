import type { IAppLayoutTopBarThemeFactory } from './AppLayoutTopBar.css';
import type { IAppLayoutTopBarFactory } from './AppLayoutTopBar.types';
import { Burger } from '~/components/Burger';
import { useComponentTheme, useProps } from '~/components/Theme';
import { TopAppBar } from '~/components/TopAppBar';
import { componentFactory } from '~/utils/component/componentFactory';
import { isFunction } from '~/utils/isFunction';
import { useAppLayoutContext } from '../AppLayout.context';
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
      leadingNavigation,
      trailingActions,
      wide,
      divider,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const appLayoutContext = useAppLayoutContext();
    useAppLayoutComponent('topBar');

    const { getStyles } = useComponentTheme<IAppLayoutTopBarThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: appLayoutTopBarTheme,
    });

    const hasNavigationDrawer =
      appLayoutContext?.components.includes('navigationDrawer');
    const isNavigationDrawerOpened =
      appLayoutContext?.navigationDrawer?.state?.opened;
    const hasSideSheet = appLayoutContext?.components.includes('sideSheet');

    return (
      <TopAppBar
        {...getStyles('root', {
          modifiers: {
            'with-divider': divider,
          },
        })}
        as="header"
        ref={forwardedRef}
        leadingNavigation={
          ((wide && hasNavigationDrawer) ||
            (!wide && hasNavigationDrawer && !isNavigationDrawerOpened) ||
            leadingNavigation) && (
            <>
              {leadingNavigation ?? (
                <Burger
                  opened={appLayoutContext?.navigationDrawer?.state?.opened}
                  onClick={appLayoutContext?.navigationDrawer?.state?.toggle}
                />
              )}
            </>
          )
        }
        trailingActions={(renderProps) =>
          (hasSideSheet ?? trailingActions) && (
            <>
              {isFunction(trailingActions)
                ? trailingActions(renderProps)
                : trailingActions}
              {hasSideSheet && (
                <Burger
                  opened={appLayoutContext?.sideSheet?.state?.opened}
                  onClick={appLayoutContext?.sideSheet?.state?.toggle}
                />
              )}
            </>
          )
        }
        {...other}
      />
    );
  },
);

AppLayoutTopBar.displayName = `@sixui/core/${COMPONENT_NAME}`;
AppLayoutTopBar.theme = appLayoutTopBarTheme;
