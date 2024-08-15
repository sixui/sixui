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

import type { IModalSideSheetProps } from './ModalSideSheet.types';
import { createPolymorphicComponent } from '~/helpers/react/polymorphicComponentTypes';
import { isFunction } from '~/helpers/isFunction';
import { useControlledValue } from '~/hooks/useControlledValue';
import { useStyles } from '~/hooks/useStyles';
import { SideSheetContent } from '../SideSheetContent';
import { Scrim } from '../Scrim';
import { Portal } from '../Portal';
import { FloatingTransition } from '../FloatingTransition';
import { modalSideSheetStyles } from './ModalSideSheet.styles';
import { modalSideSheetTheme } from './ModalSideSheet.stylex';
import { modalSideSheetVariantStyles } from './variants';

// https://github.com/material-components/material-web/blob/main/modalSideSheet/internal/modalSideSheet.ts

export const ModalSideSheet = createPolymorphicComponent<
  'div',
  IModalSideSheetProps
>(
  forwardRef<HTMLDivElement, IModalSideSheetProps>(
    function ModalSideSheet(props, forwardedRef) {
      const {
        styles,
        sx,
        root,
        innerStyles,
        trigger,
        isOpen: isOpenProp,
        disabled,
        onOpenChange,
        variant = 'standard',
        anchor = 'left',
        ...other
      } = props;

      const contentVariant = variant === 'detached' ? 'detachedModal' : 'modal';
      const variantStyles = modalSideSheetVariantStyles[variant];
      const { combineStyles, getStyles, globalStyles } = useStyles({
        name: 'ModalSideSheet',
        styles: [modalSideSheetStyles, variantStyles, styles],
      });

      const [isOpen, setIsOpen] = useControlledValue({
        controlled: isOpenProp,
        default: !!isOpenProp,
        name: 'ModalSideSheet',
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
        enabled: true,
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

      const modalSideSheetRef = useMergeRefs([
        forwardedRef,
        floating.refs.setFloating,
      ]);

      return (
        <>
          {triggerElement}

          {transitionStatus.isMounted ? (
            <Portal root={root}>
              <Scrim floatingContext={floating.context} lockScroll />
              <div
                {...getStyles(
                  modalSideSheetTheme,
                  globalStyles,
                  'host',
                  `host$${anchor}`,
                )}
              >
                <FloatingFocusManager
                  context={floating.context}
                  visuallyHiddenDismiss={true}
                  modal
                >
                  <FloatingTransition
                    status={transitionStatus.status}
                    placement={anchor}
                    origin='edge'
                    pattern='enterExitOffScreen'
                  >
                    <SideSheetContent
                      sx={[combineStyles('modalSideSheetContent'), sx]}
                      styles={innerStyles?.modalSideSheetContent}
                      onClose={(event) =>
                        floating.context.onOpenChange(
                          false,
                          event.nativeEvent,
                          'click',
                        )
                      }
                      {...other}
                      {...interactions.getFloatingProps()}
                      anchor={anchor}
                      variant={contentVariant}
                      ref={modalSideSheetRef}
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
