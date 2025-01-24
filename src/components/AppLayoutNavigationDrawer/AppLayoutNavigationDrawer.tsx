import type { IAppLayoutNavigationDrawerThemeFactory } from './AppLayoutNavigationDrawer.css';
import type { IAppLayoutNavigationDrawerFactory } from './AppLayoutNavigationDrawer.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { mergeClassNames } from '~/utils/styles/mergeClassNames';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { useAppLayoutContext } from '../AppLayout/AppLayout.context';
import { NavigationDrawerDestination } from '../NavigationDrawerDestination';
import { NavigationDrawerSection } from '../NavigationDrawerSection';
import { SideSheet } from '../SideSheet';
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
      onClose,
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
      standardOpenedProp ??
      appLayoutContext?.navigationDrawer?.state?.standardOpened;
    const modalOpened =
      modalOpenedProp ?? appLayoutContext?.navigationDrawer?.state?.modalOpened;
    const root = rootProp ?? appLayoutContext?.root;

    const handleClose = (event?: React.MouseEvent): void => {
      onClose?.(event);
      appLayoutContext?.navigationDrawer?.state?.close();
    };

    return (
      <SideSheet
        {...getStyles('root')}
        classNames={mergeClassNames(classNames, {
          sideSheetContent: getStyles('sideSheetContent').className,
        })}
        standardOpened={standardOpened}
        modalOpened={modalOpened}
        onClose={handleClose}
        root={root}
        ref={forwardedRef}
        {...other}
      />
    );
  });

AppLayoutNavigationDrawer.theme = appLayoutNavigationDrawerTheme;
AppLayoutNavigationDrawer.displayName = `@sixui/${COMPONENT_NAME}`;
AppLayoutNavigationDrawer.Section = NavigationDrawerSection;
AppLayoutNavigationDrawer.Destination = NavigationDrawerDestination;
