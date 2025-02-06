import type { IDrawerSideSheetThemeFactory } from './DrawerSideSheet.css';
import type { IDrawerSideSheetFactory } from './DrawerSideSheet.types';
import { DrawerAside } from '~/components/DrawerAside';
import { SideSheetContent } from '~/components/SideSheetContent';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { mergeClassNames } from '~/utils/css/mergeClassNames';
import { COMPONENT_NAME } from './DrawerSideSheet.constants';
import { drawerSideSheetTheme } from './DrawerSideSheet.css';

export const DrawerSideSheet = componentFactory<IDrawerSideSheetFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      opened,
      modal,
      detached,
      side = 'left',
      onClose,
      onClosed,
      drawerAsideProps,
      portalProps,
      withoutPortal,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<IDrawerSideSheetThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: drawerSideSheetTheme,
    });

    return (
      <DrawerAside
        {...getStyles('root')}
        classNames={mergeClassNames(classNames, {
          drawerSideSheetContent: getStyles('sideSheetContent').className,
        })}
        opened={opened}
        modal={modal}
        detached={detached}
        side={side}
        onClose={onClose}
        onClosed={onClosed}
        ref={forwardedRef}
        portalProps={portalProps}
        withoutPortal={withoutPortal}
        {...drawerAsideProps}
      >
        <SideSheetContent
          side={side}
          variant={detached ? 'detachedDrawer' : 'drawer'}
          showCloseButton
          onClose={onClose}
          {...getStyles('sideSheetContent')}
          {...other}
        />
      </DrawerAside>
    );
  },
);

DrawerSideSheet.theme = drawerSideSheetTheme;
DrawerSideSheet.displayName = `@sixui/core/${COMPONENT_NAME}`;
