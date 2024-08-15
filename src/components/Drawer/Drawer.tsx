import { forwardRef } from 'react';

import type { IDrawerProps } from './Drawer.types';
import { createPolymorphicComponent } from '~/helpers/react/polymorphicComponentTypes';
import { isFunction } from '~/helpers/isFunction';
import { useControlledValue } from '~/hooks/useControlledValue';
import { useStyles } from '~/hooks/useStyles';
import { PopoverBase } from '../PopoverBase';
import { drawerStyles } from './Drawer.styles';

// https://github.com/material-components/material-web/blob/main/drawer/internal/drawer.ts

export const Drawer = createPolymorphicComponent<'div', IDrawerProps>(
  forwardRef<HTMLDivElement, IDrawerProps>(
    function Drawer(props, forwardedRef) {
      const {
        styles,
        sx,
        root,
        trigger,
        isOpen: isOpenProp,
        defaultIsOpen,
        disabled,
        onOpenChange,
        anchor = 'left',
        children,
        ...other
      } = props;

      const { combineStyles, globalStyles } = useStyles({
        name: 'Drawer',
        styles: [drawerStyles, styles],
      });

      const [isOpen, setIsOpen] = useControlledValue({
        controlled: isOpenProp,
        default: defaultIsOpen || false,
        name: 'Drawer',
        onValueChange: onOpenChange,
      });
      const orientation = ['left', 'right'].includes(anchor)
        ? 'horizontal'
        : 'vertical';

      return (
        <PopoverBase
          sx={combineStyles(
            globalStyles,
            'host',
            `host$${orientation}`,
            `host$${anchor}`,
          )}
          isOpen={isOpen}
          defaultIsOpen={defaultIsOpen}
          onOpenChange={setIsOpen}
          contentRenderer={children}
          placement={anchor}
          floatingStrategy='fixed'
          openOnClick
          trapFocus
          slotProps={{
            floatingFocusManager: {
              visuallyHiddenDismiss: true,
            },
            floatingTransition: {
              sx: [combineStyles('content'), sx],
              ...other,
            },
          }}
          root={root}
          middlewares={{
            flip: false,
            shift: false,
          }}
          withScrim
          reference='viewport'
          disabled={disabled}
          ref={forwardedRef}
        >
          {(renderProps) =>
            isFunction(trigger) ? trigger(renderProps) : trigger
          }
        </PopoverBase>
      );
    },
  ),
);
