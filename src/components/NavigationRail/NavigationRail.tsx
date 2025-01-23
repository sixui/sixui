import type { INavigationRailThemeFactory } from './NavigationRail.css';
import type { INavigationRailFactory } from './NavigationRail.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { useAppLayoutContext } from '../AppLayout/AppLayout.context';
import { extractBoxProps } from '../Box/extractBoxProps';
import { NavigationRailContent } from '../NavigationRailContent';
import { StandardAside } from '../StandardAside';
import { navigationRailTheme } from './NavigationRail.css';

const COMPONENT_NAME = 'NavigationRail';

export const NavigationRail = componentFactory<INavigationRailFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      opened: openedProp,
      side = 'left',
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });
    const { boxProps, other: forwardedProps } = extractBoxProps(other);

    const appLayoutContext = useAppLayoutContext();

    const { getStyles } = useComponentTheme<INavigationRailThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: navigationRailTheme,
    });

    const hasNavigationRail =
      appLayoutContext?.components.includes('navigationRail') ?? true;
    if (!hasNavigationRail) {
      return null;
    }

    const opened = openedProp ?? appLayoutContext?.navigationMode === 'rail';

    return (
      <StandardAside
        {...getStyles('root')}
        opened={opened}
        side={side}
        ref={forwardedRef}
        {...boxProps}
      >
        <NavigationRailContent
          side={side}
          {...getStyles('navigationRailContent')}
          {...forwardedProps}
        />
      </StandardAside>
    );
  },
);

NavigationRail.theme = navigationRailTheme;
NavigationRail.displayName = `@sixui/${COMPONENT_NAME}`;
NavigationRail.Destination = NavigationRailContent.Destination;
