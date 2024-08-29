import { forwardRef } from 'react';

import type { IDrawerProps } from './Drawer.types';
import { createPolymorphicComponent } from '~/helpers/react/polymorphicComponentTypes';
import { useStyles } from '~/hooks/useStyles';
import { PopoverBase } from '../PopoverBase';
import { drawerStyles } from './Drawer.styles';
import { drawerTheme } from './Drawer.stylex';

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
        detached,
        ...other
      } = props;

      const { combineStyles, globalStyles } = useStyles({
        componentName: 'Drawer',
        styles: [drawerStyles, styles],
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
            detached && 'host$detached',
            sx,
          )}
          root={root}
          opened={opened}
          defaultOpened={defaultOpened}
          onClose={onClose}
          contentRenderer={children}
          floatingStrategy={false}
          placement={anchor}
          trapFocus
          preventAutoFocus
          withScrim
          slotProps={{
            floatingFocusManager: {
              visuallyHiddenDismiss: true,
            },
            floatingTransition: {
              sx: combineStyles('content'),
              ...other,
            },
          }}
          middlewares={{
            flip: false,
            shift: false,
            size: false,
          }}
          disabled={disabled}
          ref={forwardedRef}
        />
      );
    },
  ),
);
