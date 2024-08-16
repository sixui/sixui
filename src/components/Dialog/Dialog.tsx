import { forwardRef } from 'react';

import type { IDialogProps } from './Dialog.types';
import { createPolymorphicComponent } from '~/helpers/react/polymorphicComponentTypes';
import { isFunction } from '~/helpers/isFunction';
import { useControlledValue } from '~/hooks/useControlledValue';
import { useStyles } from '~/hooks/useStyles';
import { DialogContent } from '../DialogContent';
import { dialogStyles } from './Dialog.styles';
import { dialogTheme } from './Dialog.stylex';
import { PopoverBase } from '../PopoverBase';

// https://github.com/material-components/material-web/blob/main/dialog/internal/dialog.ts

export const Dialog = createPolymorphicComponent<'div', IDialogProps>(
  forwardRef<HTMLDivElement, IDialogProps>(
    function Dialog(props, forwardedRef) {
      const {
        styles,
        sx,
        root,
        innerStyles,
        trigger,
        opened: openedProp,
        disabled,
        onOpenChange,
        modal,
        ...other
      } = props;

      const { combineStyles, globalStyles } = useStyles({
        name: 'Dialog',
        styles: [dialogStyles, styles],
      });

      const [opened, setOpened] = useControlledValue({
        controlled: openedProp,
        default: !!openedProp,
        name: 'Dialog',
        onValueChange: onOpenChange,
      });

      return (
        <PopoverBase
          sx={combineStyles('host')}
          root={root}
          opened={opened}
          onOpenChange={setOpened}
          contentRenderer={({ close }) => (
            <DialogContent
              sx={[
                dialogTheme,
                globalStyles,
                combineStyles('dialogContent'),
                sx,
              ]}
              styles={innerStyles?.dialogContent}
              onClose={close}
              {...other}
            />
          )}
          floatingStrategy={false}
          placement='top'
          openEvents={{ click: true }}
          closeEvents={{
            focusOut: false,
            clickOutside: !modal,
            escapeKey: !modal,
          }}
          trapFocus
          withScrim
          middlewares={{
            flip: false,
            shift: false,
            size: false,
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
