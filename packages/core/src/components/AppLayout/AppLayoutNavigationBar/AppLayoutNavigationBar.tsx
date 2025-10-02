import type { IAppLayoutNavigationBarThemeFactory } from './AppLayoutNavigationBar.css';
import type { IAppLayoutNavigationBarFactory } from './AppLayoutNavigationBar.types';
import { useAppLayoutContext } from '~/components/AppLayout/AppLayout.context';
import { NavigationBar } from '~/components/NavigationBar';
import { NavigationBarDestination } from '~/components/NavigationBar/NavigationBarDestination';
import { useComponentTheme, useProps } from '~/components/Theme';
import { useAfterHydration } from '~/hooks/useAfterHydration';
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
      opened: openedProp,
      portalProps,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const appLayoutContext = useAppLayoutContext();
    useAppLayoutComponent('navigationBar');

    const { getStyles } =
      useComponentTheme<IAppLayoutNavigationBarThemeFactory>({
        componentName: COMPONENT_NAME,
        classNames,
        className,
        styles,
        style,
        variant,
        theme: appLayoutNavigationBarTheme,
      });

    const isAfterHydration = useAfterHydration();

    const opened = openedProp ?? appLayoutContext?.navigationMode === 'bar';
    const root = portalProps?.root ?? appLayoutContext?.root;

    // Always render to prevent tree structure mismatch during hydration.
    // Hide component via visibility until after hydration completes.
    return (
      <NavigationBar
        {...getStyles('root')}
        classNames={mergeClassNames(classNames, {
          navigationBarContent: getStyles('navigationBarContent').className,
        })}
        opened={opened}
        ref={forwardedRef}
        portalProps={{ root }}
        style={{
          visibility: isAfterHydration ? 'visible' : 'hidden',
          ...style,
        }}
        {...other}
      />
    );
  });

AppLayoutNavigationBar.displayName = `@sixui/core/${COMPONENT_NAME}`;
AppLayoutNavigationBar.theme = appLayoutNavigationBarTheme;
AppLayoutNavigationBar.Destination = NavigationBarDestination;
