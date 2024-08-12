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

import type { IBottomSheetProps } from './BottomSheet.types';
import { createPolymorphicComponent } from '~/helpers/react/polymorphicComponentTypes';
import { isFunction } from '~/helpers/isFunction';
import { useControlledValue } from '~/hooks/useControlledValue';
import { useStyles } from '~/hooks/useStyles';
import { BottomSheetContent } from '../BottomSheetContent';
import { Scrim } from '../Scrim';
import { Portal } from '../Portal';
import { FloatingTransition } from '../FloatingTransition';
import { bottomSheetStyles } from './BottomSheet.styles';
import { bottomSheetTheme } from './BottomSheet.stylex';

// https://github.com/material-components/material-web/blob/main/bottomSheet/internal/bottomSheet.ts

export const BottomSheet = createPolymorphicComponent<'div', IBottomSheetProps>(
  forwardRef<HTMLDivElement, IBottomSheetProps>(
    function BottomSheet(props, forwardedRef) {
      const {
        styles,
        sx,
        innerStyles,
        trigger,
        isOpen: isOpenProp,
        disabled,
        onOpenChange,
        modal: modalProp,
        minimized,
        ...other
      } = props;

      const { combineStyles, getStyles, globalStyles } = useStyles({
        name: 'BottomSheet',
        styles: [bottomSheetStyles, styles],
      });

      const variant = minimized
        ? 'minimized'
        : modalProp
          ? 'modal'
          : 'standard';
      const modal = variant === 'modal';
      const draggable = variant !== 'minimized';

      const [isOpen, setIsOpen] = useControlledValue({
        controlled: isOpenProp,
        default: !!isOpenProp,
        name: 'BottomSheet',
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
        enabled: !!modal,
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

      const bottomSheetRef = useMergeRefs([
        forwardedRef,
        floating.refs.setFloating,
      ]);

      return (
        <>
          {triggerElement}

          {transitionStatus.isMounted ? (
            <Portal>
              {modal ? (
                <Scrim floatingContext={floating.context} lockScroll />
              ) : null}
              <div {...getStyles('host')}>
                <FloatingFocusManager
                  context={floating.context}
                  order={['reference', 'content']}
                >
                  <FloatingTransition
                    status={transitionStatus.status}
                    placement='top'
                    origin='edge'
                    pattern='enterExitOffScreen'
                  >
                    <BottomSheetContent
                      sx={[
                        bottomSheetTheme,
                        globalStyles,
                        combineStyles(
                          'bottomSheetContent',
                          minimized && 'bottomSheetContent$minimized',
                        ),
                        sx,
                      ]}
                      styles={innerStyles?.bottomSheetContent}
                      onClose={(event) =>
                        floating.context.onOpenChange(
                          false,
                          event.nativeEvent,
                          'click',
                        )
                      }
                      {...other}
                      {...interactions.getFloatingProps()}
                      draggable={draggable}
                      variant={variant}
                      ref={bottomSheetRef}
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
