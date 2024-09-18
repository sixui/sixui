import { forwardRef } from 'react';

import type { IDialogProps } from './Dialog.types';
import { useStyles } from '~/hooks/useStyles';
import { createPolymorphicComponent } from '~/utils/component/createPolymorphicComponent';
import { DialogContent } from '../DialogContent';
import { PopoverBase } from '../PopoverBase';
import { dialogStyles } from './Dialog.styles';
import { dialogTheme } from './Dialog.stylex';

// https://github.com/material-components/material-web/blob/main/dialog/internal/dialog.ts

export const Dialog = createPolymorphicComponent<'div', IDialogProps>(
  forwardRef<HTMLDivElement, IDialogProps>(
    function Dialog(props, forwardedRef) {
      const {
        styles,
        sx,
        root,
        innerStyles,
        opened,
        disabled,
        onClose,
        modal,
        ...other
      } = props;

      const { combineStyles, globalStyles } = useStyles({
        componentName: 'Dialog',
        styles: [dialogStyles, styles],
      });

      return (
        <PopoverBase
          sx={combineStyles('host')}
          root={root}
          opened={opened}
          onClose={onClose}
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
              ref={forwardedRef}
            />
          )}
          floatingStrategy={false}
          placement="top"
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
        />
      );
    },
  ),
);
