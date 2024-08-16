import { forwardRef } from 'react';

import type { IDrawerProps } from './Drawer.types';
import { createPolymorphicComponent } from '~/helpers/react/polymorphicComponentTypes';
import { useStyles } from '~/hooks/useStyles';
import { PopoverBase } from '../PopoverBase';
import { drawerStyles } from './Drawer.styles';
import { drawerTheme } from './Drawer.stylex';
import { drawerVariantStyles } from './variants';

// https://github.com/material-components/material-web/blob/main/drawer/internal/drawer.ts

export const Drawer = createPolymorphicComponent<'div', IDrawerProps>(
  forwardRef<HTMLDivElement, IDrawerProps>(
    function Drawer(props, forwardedRef) {
      const {
        styles,
        sx,
        root,
        opened,
        defaultOpened: defaultOpened,
        disabled,
        onClose,
        anchor = 'left',
        children,
        variant = 'standard',
        ...other
      } = props;

      const variantStyles = drawerVariantStyles[variant];
      const { combineStyles, globalStyles } = useStyles({
        name: 'Drawer',
        styles: [drawerStyles, variantStyles, styles],
      });

      const orientation = ['left', 'right'].includes(anchor)
        ? 'vertical'
        : 'horizontal';

      return (
        <PopoverBase
          sx={combineStyles(
            drawerTheme,
            globalStyles,
            'host',
            `host$${orientation}`,
            `host$${anchor}`,
          )}
          root={root}
          opened={opened}
          defaultOpened={defaultOpened}
          onClose={onClose}
          contentRenderer={children}
          floatingStrategy={false}
          placement={anchor}
          trapFocus
          withScrim
          slotProps={{
            floatingFocusManager: {
              visuallyHiddenDismiss: true,
            },
            floatingTransition: {
              sx: [combineStyles('content'), sx],
              ...other,
            },
          }}
          middlewares={{
            flip: false,
            shift: false,
          }}
          disabled={disabled}
          ref={forwardedRef}
        />
      );
    },
  ),
);
