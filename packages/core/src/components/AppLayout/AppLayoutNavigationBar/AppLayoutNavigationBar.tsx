import type { IAppLayoutNavigationBarThemeFactory } from './AppLayoutNavigationBar.css';
import type { IAppLayoutNavigationBarFactory } from './AppLayoutNavigationBar.types';
import { useAppLayoutContext } from '~/components/AppLayout/AppLayout.context';
import { NavigationBar } from '~/components/NavigationBar';
import { NavigationBarDestination } from '~/components/NavigationBar/NavigationBarDestination';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { mergeClassNames } from '~/utils/css/mergeClassNames';
import { useAppLayoutComponent } from '../hooks/useAppLayoutComponent';
import { COMPONENT_NAME } from './AppLayoutNavigationBar.constants';
import { appLayoutNavigationBarTheme } from './AppLayoutNavigationBar.css';

export const AppLayoutNavigationBar =
  componentFactory<IAppLayoutNavigationBarFactory>((props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      hasTopBar: hasTopBarProp,
      opened: openedProp,
      portalProps,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const appLayoutContext = useAppLayoutContext();
    useAppLayoutComponent('navigationBar');

    const hasTopBar =
      hasTopBarProp ?? appLayoutContext?.components.includes('topBar');

    const { getStyles } =
      useComponentTheme<IAppLayoutNavigationBarThemeFactory>({
        componentName: COMPONENT_NAME,
        classNames,
        className,
        styles,
        style,
        variant,
        theme: appLayoutNavigationBarTheme,
        modifiers: {
          'with-top-bar': hasTopBar,
        },
      });

    const hasAppLayoutNavigationBar =
      appLayoutContext?.components.includes('navigationBar') ?? true;
    if (!hasAppLayoutNavigationBar) {
      return null;
    }

    const opened = openedProp ?? appLayoutContext?.navigationMode === 'bar';
    const root = portalProps?.root ?? appLayoutContext?.root;

    return (
      <NavigationBar
        {...getStyles('root')}
        classNames={mergeClassNames(classNames, {
          navigationBarContent: getStyles('navigationBarContent').className,
        })}
        opened={opened}
        ref={forwardedRef}
        portalProps={{ root }}
        {...other}
      />
    );
  });

AppLayoutNavigationBar.theme = appLayoutNavigationBarTheme;
AppLayoutNavigationBar.displayName = `@sixui/core/${COMPONENT_NAME}`;
AppLayoutNavigationBar.Destination = NavigationBarDestination;
