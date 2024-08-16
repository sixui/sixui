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
        opened: openedProp,
        defaultOpened: defaultOpened,
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

      const [opened, setOpened] = useControlledValue({
        controlled: openedProp,
        default: defaultOpened || false,
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
          root={root}
          opened={opened}
          defaultOpened={defaultOpened}
          onOpenChange={setOpened}
          contentRenderer={children}
          floatingStrategy={false}
          placement={anchor}
          openEvents={{ click: true }}
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
        >
          {(renderProps) => (
            <span
              style={{ display: 'inline-flex' }}
              {...renderProps.getProps()}
              ref={renderProps.setRef}
            >
              {isFunction(trigger) ? trigger(renderProps) : trigger}
            </span>
          )}
        </PopoverBase>
      );
    },
  ),
);