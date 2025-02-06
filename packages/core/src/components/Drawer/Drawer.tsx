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
      root,
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
      modifiers: {
        side,
        'full-height': fullHeight,
        'full-width': fullWidth,
      },
    });

    return (
      <PopoverBase
        classNames={classNames}
        portalProps={{ root }}
        opened={opened}
        defaultOpened={defaultOpened}
        onClose={onClose}
        onClosed={onClosed}
        contentRenderer={children}
        placement={{ side }}
        modal={modal}
        scrim={modal || jail}
        jail={jail}
        floatingFocusManagerProps={{
          visuallyHiddenDismiss: true,
        }}
        floatingMotionProps={other}
        middlewares={false}
        popoverProps={{ ...getStyles('root'), ...other }}
        disabled={disabled}
        preventAutoFocus
        ref={forwardedRef}
      />
    );
  },
);

Drawer.theme = drawerTheme;
Drawer.displayName = `@sixui/core/${COMPONENT_NAME}`;
