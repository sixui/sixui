import { forwardRef } from 'react';
import {
  FloatingFocusManager,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useMergeRefs,
  useRole,
  useTransitionStatus,
} from '@floating-ui/react';

import type { IDialogProps } from './Dialog.types';
import { createPolymorphicComponent } from '~/helpers/react/polymorphicComponentTypes';
import { isFunction } from '~/helpers/isFunction';
import { useControlledValue } from '~/hooks/useControlledValue';
import { useStyles } from '~/hooks/useStyles';
import { DialogContent } from '../DialogContent';
import { Scrim } from '../Scrim';
import { Portal } from '../Portal';
import { FloatingTransition } from '../FloatingTransition';
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
        trigger,
        isOpen: isOpenProp,
        disabled,
        onOpenChange,
        modal,
        ...other
      } = props;

      const { combineStyles, getStyles, globalStyles } = useStyles({
        name: 'Dialog',
        styles: [dialogStyles, styles],
      });

      const [isOpen, setIsOpen] = useControlledValue({
        controlled: isOpenProp,
        default: !!isOpenProp,
        name: 'Dialog',
      });
      const floating = useFloating({
        open: isOpen && !disabled,
        onOpenChange: (isOpen, event, reason) => {
          onOpenChange?.(isOpen, event, reason);
          setIsOpen(isOpen);
        },
      });
      const click = useClick(floating.context);
      const role = useRole(floating.context);
      const dismiss = useDismiss(floating.context, {
        outsidePressEvent: 'pointerdown',
        enabled: !modal,
      });
      const interactions = useInteractions([click, role, dismiss]);
      const transitionStatus = useTransitionStatus(floating.context, {
        duration: 150, // motionTokens.duration$short3
      });

      const triggerElement = isFunction(trigger)
        ? trigger({
            isOpen,
            getProps: interactions.getReferenceProps,
            setRef: floating.refs.setReference,
          })
        : trigger;

      const dialogRef = useMergeRefs([forwardedRef, floating.refs.setFloating]);

      return (
        <>
          {triggerElement}

          {transitionStatus.isMounted ? (
            <Portal root={root}>
              <Scrim floatingContext={floating.context} lockScroll />
              <div {...getStyles('host')}>
                <FloatingFocusManager context={floating.context}>
                  <FloatingTransition
                    status={transitionStatus.status}
                    placement='bottom'
                    origin='edge'
                    pattern='enterExitOffScreen'
                  >
                    <DialogContent
                      sx={[
                        dialogTheme,
                        globalStyles,
                        combineStyles('dialogContent'),
                        sx,
                      ]}
                      styles={innerStyles?.dialogContent}
                      onClose={(event) =>
                        floating.context.onOpenChange(
                          false,
                          event.nativeEvent,
                          'click',
                        )
                      }
                      {...other}
                      {...interactions.getFloatingProps(other)}
                      ref={dialogRef}
                    />
                  </FloatingTransition>
                </FloatingFocusManager>
              </div>
            </Portal>
          ) : null}
        </>
      );
    },
  ),
);
