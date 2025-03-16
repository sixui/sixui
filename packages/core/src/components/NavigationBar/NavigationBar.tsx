import type { INavigationBarThemeFactory } from './NavigationBar.css';
import type {
  INavigationBarFactory,
  INavigationBarProps,
} from './NavigationBar.types';
import { extractBoxProps } from '~/components/Box/extractBoxProps';
import { Drawer } from '~/components/Drawer';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './NavigationBar.constants';
import { NavigationBarContent } from './NavigationBarContent';
import { NavigationBarDestination } from './NavigationBarDestination';
import { navigationBarTheme } from './NavigationBar.css';

/**
 * @see https://m3.material.io/components/navigation-bar/overview
 */
export const NavigationBar = componentFactory<INavigationBarFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      opened,
      portalProps,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });
    const { boxProps, other: otherExceptBoxProps } =
      extractBoxProps<INavigationBarProps>(other);

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
      <Drawer
        {...getStyles('root')}
        opened={opened}
        side="bottom"
        ref={forwardedRef}
        portalProps={portalProps}
        {...boxProps}
      >
        <NavigationBarContent
          {...getStyles('navigationBarContent')}
          {...otherExceptBoxProps}
        />
      </Drawer>
    );
  },
);

NavigationBar.displayName = `@sixui/core/${COMPONENT_NAME}`;
NavigationBar.theme = navigationBarTheme;
NavigationBar.Destination = NavigationBarDestination;
