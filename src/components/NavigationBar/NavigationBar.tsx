import type { INavigationBarThemeFactory } from './NavigationBar.css';
import type { INavigationBarFactory } from './NavigationBar.types';
import { extractBoxProps } from '~/components/Box/extractBoxProps';
import { Drawer } from '~/components/Drawer';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { NavigationBarContent } from './NavigationBarContent';
import { NavigationBarDestination } from './NavigationBarDestination';
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
      root,
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
      <Drawer
        {...getStyles('root')}
        opened={opened}
        side="bottom"
        ref={forwardedRef}
        root={root}
        {...boxProps}
      >
        <NavigationBarContent
          {...getStyles('navigationBarContent')}
          {...forwardedProps}
        />
      </Drawer>
    );
  },
);

NavigationBar.theme = navigationBarTheme;
NavigationBar.displayName = `@sixui/${COMPONENT_NAME}`;
NavigationBar.Destination = NavigationBarDestination;
