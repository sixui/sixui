import type { IAppLayoutNavigationRailThemeFactory } from './AppLayoutNavigationRail.css';
import type { IAppLayoutNavigationRailFactory } from './AppLayoutNavigationRail.types';
import { useAppLayoutContext } from '~/components/AppLayout/AppLayout.context';
import { NavigationRail } from '~/components/NavigationRail';
import { NavigationRailDestination } from '~/components/NavigationRail/NavigationRailDestination';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { useAppLayoutComponent } from '../hooks/useAppLayoutComponent';
import { COMPONENT_NAME } from './AppLayoutNavigationRail.constants';
import { appLayoutNavigationRailTheme } from './AppLayoutNavigationRail.css';

export const AppLayoutNavigationRail =
  componentFactory<IAppLayoutNavigationRailFactory>((props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      hasHeader: hasHeaderProp,
      opened: openedProp,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const appLayoutContext = useAppLayoutContext();
    useAppLayoutComponent('navigationRail');

    const hasHeader =
      hasHeaderProp ?? appLayoutContext?.components.includes('header');

    const { getStyles } =
      useComponentTheme<IAppLayoutNavigationRailThemeFactory>({
        componentName: COMPONENT_NAME,
        classNames,
        className,
        styles,
        style,
        variant,
        theme: appLayoutNavigationRailTheme,
        modifiers: {
          'with-header': hasHeader,
        },
      });

    const hasAppLayoutNavigationRail =
      appLayoutContext?.components.includes('navigationRail') ?? true;
    if (!hasAppLayoutNavigationRail) {
      return null;
    }

    const opened = openedProp ?? appLayoutContext?.navigationMode === 'rail';

    return (
      <NavigationRail
        {...getStyles('root')}
        opened={opened}
        ref={forwardedRef}
        {...other}
      />
    );
  });

AppLayoutNavigationRail.theme = appLayoutNavigationRailTheme;
AppLayoutNavigationRail.displayName = `@sixui/core/${COMPONENT_NAME}`;
AppLayoutNavigationRail.Destination = NavigationRailDestination;
