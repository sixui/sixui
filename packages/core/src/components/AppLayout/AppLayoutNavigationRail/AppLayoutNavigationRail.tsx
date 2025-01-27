import type { IAppLayoutNavigationRailThemeFactory } from './AppLayoutNavigationRail.css';
import type { IAppLayoutNavigationRailFactory } from './AppLayoutNavigationRail.types';
import { useAppLayoutContext } from '~/components/AppLayout/AppLayout.context';
import { NavigationRail } from '~/components/NavigationRail';
import { NavigationRailDestination } from '~/components/NavigationRail/NavigationRailDestination';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { appLayoutNavigationRailTheme } from './AppLayoutNavigationRail.css';

const COMPONENT_NAME = 'AppLayoutNavigationRail';

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
AppLayoutNavigationRail.displayName = `@sixui/${COMPONENT_NAME}`;
AppLayoutNavigationRail.Destination = NavigationRailDestination;
