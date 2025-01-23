import type { IAppLayoutNavigationBarThemeFactory } from './AppLayoutNavigationBar.css';
import type { IAppLayoutNavigationBarFactory } from './AppLayoutNavigationBar.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { mergeClassNames } from '~/utils/styles/mergeClassNames';
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
      root: rootProp,
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
    const root = rootProp ?? appLayoutContext?.root;

    return (
      <NavigationBar
        {...getStyles('root')}
        classNames={mergeClassNames(classNames, {
          navigationBarContent: getStyles('navigationBarContent').className,
        })}
        opened={opened}
        ref={forwardedRef}
        root={root}
        {...other}
      />
    );
  });

AppLayoutNavigationBar.theme = appLayoutNavigationBarTheme;
AppLayoutNavigationBar.displayName = `@sixui/${COMPONENT_NAME}`;
AppLayoutNavigationBar.Destination = NavigationBarDestination;
