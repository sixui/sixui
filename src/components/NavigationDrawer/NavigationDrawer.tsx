import type { INavigationDrawerThemeFactory } from './NavigationDrawer.css';
import type { INavigationDrawerFactory } from './NavigationDrawer.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { mergeClassNames } from '~/utils/styles/mergeClassNames';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { useAppLayoutContext } from '../AppLayout/AppLayout.context';
import { NavigationDrawerDestination } from '../NavigationDrawerDestination';
import { NavigationDrawerSection } from '../NavigationDrawerSection';
import { SideSheet } from '../SideSheet';
import { navigationDrawerTheme } from './NavigationDrawer.css';

const COMPONENT_NAME = 'NavigationDrawer';

export const NavigationDrawer = componentFactory<INavigationDrawerFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      detached,
      standardOpened,
      modalOpened,
      onClose,
      side = 'left',
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const appLayoutContext = useAppLayoutContext();

    const { getStyles } = useComponentTheme<INavigationDrawerThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: navigationDrawerTheme,
    });

    const standardNavigationDrawerOpened =
      standardOpened ??
      appLayoutContext?.navigationDrawer?.state?.standardOpened;
    const modalNavigationDrawerOpened =
      modalOpened ?? appLayoutContext?.navigationDrawer?.state?.modalOpened;

    return (
      <SideSheet
        {...getStyles('root')}
        standardOpened={standardNavigationDrawerOpened}
        classNames={mergeClassNames(classNames, {
          sideSheetContent: getStyles('sideSheetContent').className,
        })}
        modalOpened={modalNavigationDrawerOpened}
        detached={detached}
        side={side}
        onClose={() => {
          onClose?.();
          appLayoutContext?.navigationDrawer?.state?.close();
        }}
        ref={forwardedRef}
        {...other}
      />
    );
  },
);

NavigationDrawer.theme = navigationDrawerTheme;
NavigationDrawer.displayName = `@sixui/${COMPONENT_NAME}`;
NavigationDrawer.Section = NavigationDrawerSection;
NavigationDrawer.Destination = NavigationDrawerDestination;
