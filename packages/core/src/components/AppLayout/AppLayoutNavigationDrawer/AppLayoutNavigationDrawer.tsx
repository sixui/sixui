import type { IAppLayoutNavigationDrawerThemeFactory } from './AppLayoutNavigationDrawer.css';
import type { IAppLayoutNavigationDrawerFactory } from './AppLayoutNavigationDrawer.types';
import { useAppLayoutContext } from '~/components/AppLayout/AppLayout.context';
import { NavigationDrawer } from '~/components/NavigationDrawer';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { mergeClassNames } from '~/utils/css/mergeClassNames';
import { useAppLayoutComponent } from '../hooks/useAppLayoutComponent';
import { COMPONENT_NAME } from './AppLayoutNavigationDrawer.constants';
import { appLayoutNavigationDrawerTheme } from './AppLayoutNavigationDrawer.css';

export const AppLayoutNavigationDrawer =
  componentFactory<IAppLayoutNavigationDrawerFactory>((props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      opened: openedProp,
      drawer: drawerProp,
      modal: modalProp,
      portalProps,
      onClose,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const appLayoutContext = useAppLayoutContext();
    useAppLayoutComponent('navigationDrawer');

    const { getStyles } =
      useComponentTheme<IAppLayoutNavigationDrawerThemeFactory>({
        componentName: COMPONENT_NAME,
        classNames,
        className,
        styles,
        style,
        variant,
        theme: appLayoutNavigationDrawerTheme,
      });

    const hasAppLayoutNavigationDrawer =
      appLayoutContext?.components.includes('navigationDrawer') ?? true;
    if (!hasAppLayoutNavigationDrawer) {
      return null;
    }

    const opened =
      openedProp ?? appLayoutContext?.navigationDrawer?.state?.opened;
    const drawer =
      drawerProp ?? appLayoutContext?.navigationDrawer?.state?.isDrawer;
    const modal = modalProp ?? drawer;
    const root = portalProps?.root ?? appLayoutContext?.root;

    const handleClose = (): void => {
      onClose?.();
      appLayoutContext?.navigationDrawer?.state?.close();
    };

    return (
      <NavigationDrawer
        {...getStyles('root')}
        classNames={mergeClassNames(classNames, {
          sideSheetContent: getStyles('sideSheetContent').className,
        })}
        opened={opened}
        drawer={drawer}
        modal={modal}
        onClose={handleClose}
        portalProps={{ root }}
        ref={forwardedRef}
        {...other}
      />
    );
  });

AppLayoutNavigationDrawer.displayName = `@sixui/core/${COMPONENT_NAME}`;
AppLayoutNavigationDrawer.theme = appLayoutNavigationDrawerTheme;
AppLayoutNavigationDrawer.Section = NavigationDrawer.Section;
AppLayoutNavigationDrawer.Destination = NavigationDrawer.Destination;
