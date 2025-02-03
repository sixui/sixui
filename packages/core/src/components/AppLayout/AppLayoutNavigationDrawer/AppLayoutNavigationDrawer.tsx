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
      modal: modalProp,
      hasHeader: hasHeaderProp,
      root: rootProp,
      onClose,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const appLayoutContext = useAppLayoutContext();
    useAppLayoutComponent('navigationDrawer');

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

    const opened =
      openedProp ?? appLayoutContext?.navigationDrawer?.state?.opened;
    const modal = modalProp ?? appLayoutContext?.navigationDrawer?.state?.modal;
    const root = rootProp ?? appLayoutContext?.root;

    const handleClose = (event?: React.MouseEvent): void => {
      onClose?.(event);
      appLayoutContext?.navigationDrawer?.state?.close();
    };

    return (
      <NavigationDrawer
        {...getStyles('root')}
        classNames={mergeClassNames(classNames, {
          sideSheetContent: getStyles('sideSheetContent').className,
        })}
        opened={opened}
        modal={modal}
        onClose={handleClose}
        root={root}
        ref={forwardedRef}
        {...other}
      />
    );
  });

AppLayoutNavigationDrawer.theme = appLayoutNavigationDrawerTheme;
AppLayoutNavigationDrawer.displayName = `@sixui/core/${COMPONENT_NAME}`;
AppLayoutNavigationDrawer.Section = NavigationDrawer.Section;
AppLayoutNavigationDrawer.Destination = NavigationDrawer.Destination;
