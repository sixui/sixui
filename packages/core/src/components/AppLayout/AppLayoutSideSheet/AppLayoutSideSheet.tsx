import type { IAppLayoutSideSheetThemeFactory } from './AppLayoutSideSheet.css';
import type { IAppLayoutSideSheetFactory } from './AppLayoutSideSheet.types';
import { useAppLayoutContext } from '~/components/AppLayout/AppLayout.context';
import { SideSheet } from '~/components/SideSheet';
import { useComponentTheme, useProps } from '~/components/Theme';
import { useAfterHydration } from '~/hooks/useAfterHydration';
import { componentFactory } from '~/utils/component/componentFactory';
import { mergeClassNames } from '~/utils/css/mergeClassNames';
import { useAppLayoutComponent } from '../hooks/useAppLayoutComponent';
import { COMPONENT_NAME } from './AppLayoutSideSheet.constants';
import { appLayoutSideSheetTheme } from './AppLayoutSideSheet.css';

export const AppLayoutSideSheet = componentFactory<IAppLayoutSideSheetFactory>(
  (props, forwardedRef) => {
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
    useAppLayoutComponent('sideSheet');

    const { getStyles } = useComponentTheme<IAppLayoutSideSheetThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: appLayoutSideSheetTheme,
    });

    const isAfterHydration = useAfterHydration();
    const hasAppLayoutAside =
      appLayoutContext?.components.includes('sideSheet') ?? true;

    // Only conditionally return null after hydration to prevent tree structure
    // mismatch.
    if (isAfterHydration && !hasAppLayoutAside) {
      return null;
    }

    const opened = openedProp ?? appLayoutContext?.sideSheet?.state.opened;
    const drawer = drawerProp ?? appLayoutContext?.sideSheet?.state.isDrawer;
    const modal = modalProp ?? drawer;
    const root = portalProps?.root ?? appLayoutContext?.root;

    const handleClose = (): void => {
      onClose?.();
      appLayoutContext?.sideSheet?.state.close();
    };

    return (
      <SideSheet
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
  },
);

AppLayoutSideSheet.displayName = `@sixui/core/${COMPONENT_NAME}`;
AppLayoutSideSheet.theme = appLayoutSideSheetTheme;
