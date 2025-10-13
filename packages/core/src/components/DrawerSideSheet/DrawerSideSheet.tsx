import type { IDrawerSideSheetThemeFactory } from './DrawerSideSheet.css';
import type { IDrawerSideSheetFactory } from './DrawerSideSheet.types';
import { DrawerAside } from '~/components/DrawerAside';
import { SideSheetContent } from '~/components/SideSheet/SideSheetContent';
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
      detached,
      side = 'left',
      drawerAsideProps,
      portalProps,
      withoutPortal,
      opened,
      defaultOpened,
      onClose,
      onClosed,
      disabled,
      modal,
      jail,
      closeEvents,
      sideSheetContentProps,
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
        detached={detached}
        side={side}
        ref={forwardedRef}
        portalProps={portalProps}
        withoutPortal={withoutPortal}
        opened={opened}
        defaultOpened={defaultOpened}
        onClose={onClose}
        onClosed={onClosed}
        disabled={disabled}
        modal={modal}
        jail={jail}
        closeEvents={closeEvents}
        {...drawerAsideProps}
      >
        <SideSheetContent
          side={side}
          variant={detached ? 'detachedDrawer' : 'drawer'}
          onClose={onClose}
          {...getStyles('sideSheetContent')}
          {...other}
          {...sideSheetContentProps}
          divider={false}
        />
      </DrawerAside>
    );
  },
);

DrawerSideSheet.displayName = `@sixui/core/${COMPONENT_NAME}`;
DrawerSideSheet.theme = drawerSideSheetTheme;
