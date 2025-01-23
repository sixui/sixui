import type { IAppLayoutNavigationDrawerThemeFactory } from './AppLayoutNavigationDrawer.css';
import type { IAppLayoutNavigationDrawerFactory } from './AppLayoutNavigationDrawer.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { useAppLayoutContext } from '../AppLayout/AppLayout.context';
import { NavigationDrawer } from '../NavigationDrawer';
import { NavigationDrawerDestination } from '../NavigationDrawerDestination';
import { appLayoutNavigationDrawerTheme } from './AppLayoutNavigationDrawer.css';

const COMPONENT_NAME = 'AppLayoutNavigationDrawer';

export const AppLayoutNavigationDrawer =
  componentFactory<IAppLayoutNavigationDrawerFactory>((props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      standardOpened: standardOpenedProp,
      modalOpened: modalOpenedProp,
      hasHeader: hasHeaderProp,
      root: rootProp,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const appLayoutContext = useAppLayoutContext();

    const hasHeader =
      hasHeaderProp ?? appLayoutContext?.components.includes('header');

    const { getStyles } =
      useComponentTheme<IAppLayoutNavigationDrawerThemeFactory>({
        componentName: COMPONENT_NAME,
        classNames,
        className,
        styles,
        style,
        variant,
        theme: appLayoutNavigationDrawerTheme,
        modifiers: {
          'with-header': hasHeader,
        },
      });

    const hasAppLayoutNavigationDrawer =
      appLayoutContext?.components.includes('navigationDrawer') ?? true;
    if (!hasAppLayoutNavigationDrawer) {
      return null;
    }

    const standardOpened =
      standardOpenedProp ?? appLayoutContext?.aside?.state?.standardOpened;
    const modalOpened =
      modalOpenedProp ?? appLayoutContext?.aside?.state?.modalOpened;
    const root = rootProp ?? appLayoutContext?.root;

    return (
      <NavigationDrawer
        {...getStyles('root')}
        standardOpened={standardOpened}
        modalOpened={modalOpened}
        root={root}
        ref={forwardedRef}
        {...other}
      />
    );
  });

AppLayoutNavigationDrawer.theme = appLayoutNavigationDrawerTheme;
AppLayoutNavigationDrawer.displayName = `@sixui/${COMPONENT_NAME}`;
AppLayoutNavigationDrawer.Destination = NavigationDrawerDestination;
