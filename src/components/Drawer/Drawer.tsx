import type { IDrawerThemeFactory } from './Drawer.css';
import type { IDrawerFactory } from './Drawer.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { PopoverBase } from '../PopoverBase';
import { drawerTheme } from './Drawer.css';

const COMPONENT_NAME = 'Drawer';

export const Drawer = componentFactory<IDrawerFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      opened,
      defaultOpened,
      onClose,
      side = 'left',
      children,
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
      modifiers: {
        side,
      },
    });

    return (
      <PopoverBase
        {...getStyles('root')}
        opened={opened}
        defaultOpened={defaultOpened}
        onClose={onClose}
        contentRenderer={children}
        // floatingStrategy={false}
        // placement={{side}}
        trapFocus
        // preventAutoFocus
        withScrim
        // slotProps={{
        //   floatingFocusManager: {
        //     visuallyHiddenDismiss: true,
        //   },
        //   floatingTransition: {
        //     ...getStyles('content'),
        //     ...other,
        //   },
        // }}
        middlewares={{
          flip: false,
          shift: false,
          size: false,
        }}
        // disabled={disabled}
        ref={forwardedRef}
      />
    );
  },
);

Drawer.theme = drawerTheme;
Drawer.displayName = `@sixui/${COMPONENT_NAME}`;
