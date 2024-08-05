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
import { extendFloatingProps } from '~/helpers/extendFloatingProps';
import { DialogContent, type IDialogContentProps } from '../DialogContent';
import { Scrim } from '../Scrim';
import { Portal } from '../Portal';
import { FloatingTransition } from '../FloatingTransition';
import { dialogStyles } from './Dialog.styles';

// https://github.com/material-components/material-web/blob/main/dialog/internal/dialog.ts

export const Dialog = createPolymorphicComponent<'div', IDialogProps>(
  forwardRef<HTMLDivElement, IDialogProps>(
    function Dialog(props, forwardedRef) {
      const {
        styles,
        sx,
        innerStyles,
        trigger,
        isOpen: isOpenProp,
        disabled,
        onOpenChange,
        nonDismissable,
        ...other
      } = props;

      const { combineStyles, globalStyles } = useStyles({
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
        enabled: !nonDismissable,
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
            <Portal>
              <Scrim floatingContext={floating.context} lockScroll>
                <FloatingFocusManager context={floating.context}>
                  <FloatingTransition
                    status={transitionStatus.status}
                    placement='bottom'
                    origin='edge'
                  >
                    <DialogContent
                      sx={[globalStyles, combineStyles('dialogContent'), sx]}
                      styles={innerStyles?.dialogContent}
                      onClose={(event) =>
                        floating.context.onOpenChange(
                          false,
                          event.nativeEvent,
                          'click',
                        )
                      }
                      // As `other` may contain event handlers, we need to ensure
                      // that it is passed to the `getFloatingProps` function so
                      // that the handlers are correctly merged with the handlers
                      // from Floating UI hooks.
                      {...extendFloatingProps<IDialogContentProps>(
                        interactions.getFloatingProps,
                        other,
                      )}
                      ref={dialogRef}
                    />
                  </FloatingTransition>
                </FloatingFocusManager>
              </Scrim>
            </Portal>
          ) : null}
        </>
      );
    },
  ),
);
