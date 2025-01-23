import type { IAppLayoutNavigationBarThemeFactory } from './AppLayoutNavigationBar.css';
import type { IAppLayoutNavigationBarFactory } from './AppLayoutNavigationBar.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { useAppLayoutContext } from '../AppLayout/AppLayout.context';
import { NavigationBar } from '../NavigationBar';
import { NavigationBarDestination } from '../NavigationBarDestination';
import { appLayoutNavigationBarTheme } from './AppLayoutNavigationBar.css';

const COMPONENT_NAME = 'AppLayoutNavigationBar';

export const AppLayoutNavigationBar =
  componentFactory<IAppLayoutNavigationBarFactory>((props, forwardedRef) => {
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
      useComponentTheme<IAppLayoutNavigationBarThemeFactory>({
        componentName: COMPONENT_NAME,
        classNames,
        className,
        styles,
        style,
        variant,
        theme: appLayoutNavigationBarTheme,
        modifiers: {
          'with-header': hasHeader,
        },
      });

    const hasAppLayoutNavigationBar =
      appLayoutContext?.components.includes('navigationBar') ?? true;
    if (!hasAppLayoutNavigationBar) {
      return null;
    }

    const opened = openedProp ?? appLayoutContext?.navigationMode === 'bar';

    return (
      <NavigationBar
        {...getStyles('root')}
        opened={opened}
        ref={forwardedRef}
        {...other}
      />
    );
  });

AppLayoutNavigationBar.theme = appLayoutNavigationBarTheme;
AppLayoutNavigationBar.displayName = `@sixui/${COMPONENT_NAME}`;
AppLayoutNavigationBar.Destination = NavigationBarDestination;
