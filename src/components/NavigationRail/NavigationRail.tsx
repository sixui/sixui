import type { INavigationRailThemeFactory } from './NavigationRail.css';
import type { INavigationRailFactory } from './NavigationRail.types';
import { extractBoxProps } from '~/components/Box/extractBoxProps';
import { StandardAside } from '~/components/StandardAside';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { NavigationRailContent } from './NavigationRailContent';
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
      opened,
      side = 'left',
      wide: fullHeight,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });
    const { boxProps, other: forwardedProps } = extractBoxProps(other);

    const { getStyles } = useComponentTheme<INavigationRailThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: navigationRailTheme,
    });

    return (
      <StandardAside
        {...getStyles('root')}
        opened={opened}
        side={side}
        wide={fullHeight}
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
