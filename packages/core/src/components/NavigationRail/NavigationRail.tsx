import type { INavigationRailThemeFactory } from './NavigationRail.css';
import type { INavigationRailFactory } from './NavigationRail.types';
import { extractBoxProps } from '~/components/Box/extractBoxProps';
import { StandardAside } from '~/components/StandardAside';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { extractDataProps } from '~/utils/extractDataProps';
import { COMPONENT_NAME } from './NavigationRail.constants';
import { NavigationRailContent } from './NavigationRailContent';
import { navigationRailTheme } from './NavigationRail.css';

export const NavigationRail = componentFactory<INavigationRailFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      opened,
      divider = true,
      side = 'left',
      wide: fullHeight,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });
    const { boxProps, other: boxForwardedProps } = extractBoxProps(other);
    const { dataProps, other: forwardedProps } =
      extractDataProps(boxForwardedProps);

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
        {...dataProps}
        opened={opened}
        side={side}
        wide={fullHeight}
        ref={forwardedRef}
        {...boxProps}
      >
        <NavigationRailContent
          side={side}
          divider={divider}
          {...getStyles('navigationRailContent')}
          {...forwardedProps}
        />
      </StandardAside>
    );
  },
);

NavigationRail.theme = navigationRailTheme;
NavigationRail.displayName = `@sixui/core/${COMPONENT_NAME}`;
NavigationRail.Destination = NavigationRailContent.Destination;
