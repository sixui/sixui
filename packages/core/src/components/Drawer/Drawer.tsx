import type { IDrawerThemeFactory } from './Drawer.css';
import type { IDrawerFactory } from './Drawer.types';
import { PopoverBase } from '~/components/PopoverBase';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './Drawer.constants';
import { drawerTheme, drawerThemeVariants } from './Drawer.css';

export const Drawer = componentFactory<IDrawerFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      portalProps,
      withoutPortal,
      opened,
      defaultOpened,
      onClose,
      onClosed,
      side = 'left',
      children,
      disabled,
      fullHeight,
      fullWidth,
      modal,
      jail,
      closeEvents,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<IDrawerThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: drawerTheme,
      themeVariants: drawerThemeVariants,
    });

    return (
      <PopoverBase
        classNames={classNames}
        portalProps={portalProps}
        withoutPortal={withoutPortal}
        opened={opened}
        defaultOpened={defaultOpened}
        onClose={onClose}
        onClosed={onClosed}
        contentRenderer={children}
        placement={{ side }}
        modal={modal}
        scrim={modal || jail}
        jail={jail}
        closeEvents={closeEvents}
        floatingFocusManagerProps={{
          visuallyHiddenDismiss: true,
        }}
        floatingMotionProps={other}
        middlewares={false}
        popoverProps={{
          ...getStyles('root', {
            modifiers: {
              side,
              'full-height': fullHeight,
              'full-width': fullWidth,
            },
          }),
          ...other,
        }}
        disabled={disabled}
        preventAutoFocus
        ref={forwardedRef}
      />
    );
  },
);

Drawer.displayName = `@sixui/core/${COMPONENT_NAME}`;
Drawer.theme = drawerTheme;
