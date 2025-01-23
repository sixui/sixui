import type { INavigationBarThemeFactory } from './NavigationBar.css';
import type { INavigationBarFactory } from './NavigationBar.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { extractBoxProps } from '../Box/extractBoxProps';
import { NavigationBarContent } from '../NavigationBarContent';
import { NavigationRailDestination } from '../NavigationRailDestination';
import { StandardAside } from '../StandardAside';
import { navigationBarTheme } from './NavigationBar.css';

const COMPONENT_NAME = 'NavigationBar';

export const NavigationBar = componentFactory<INavigationBarFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      opened,
      wide: fullHeight,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });
    const { boxProps, other: forwardedProps } = extractBoxProps(other);

    const { getStyles } = useComponentTheme<INavigationBarThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: navigationBarTheme,
    });

    return (
      <StandardAside
        {...getStyles('root')}
        opened={opened}
        side="bottom"
        wide={fullHeight}
        ref={forwardedRef}
        {...boxProps}
      >
        <NavigationBarContent
          {...getStyles('navigationBarContent')}
          {...forwardedProps}
        />
      </StandardAside>
    );
  },
);

NavigationBar.theme = navigationBarTheme;
NavigationBar.displayName = `@sixui/${COMPONENT_NAME}`;
NavigationBar.Destination = NavigationRailDestination;
