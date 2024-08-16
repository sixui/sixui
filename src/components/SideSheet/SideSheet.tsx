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

import type { ISideSheetProps } from './SideSheet.types';
import { createPolymorphicComponent } from '~/helpers/react/polymorphicComponentTypes';
import { isFunction } from '~/helpers/isFunction';
import { useControlledValue } from '~/hooks/useControlledValue';
import { useStyles } from '~/hooks/useStyles';
import { SideSheetContent } from '../SideSheetContent';
import { Scrim } from '../Scrim';
import { Portal } from '../Portal';
import { FloatingTransition } from '../FloatingTransition';
import { sideSheetStyles } from './SideSheet.styles';
import { sideSheetTheme } from './SideSheet.stylex';
import { sideSheetVariantStyles } from './variants';

// https://github.com/material-components/material-web/blob/main/sideSheet/internal/sideSheet.ts

export const SideSheet = createPolymorphicComponent<'div', ISideSheetProps>(
  forwardRef<HTMLDivElement, ISideSheetProps>(
    function SideSheet(props, forwardedRef) {
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
        variant: variantProp = 'standard',
        anchor = 'left',
        ...other
      } = props;

      const variant =
        variantProp === 'detached' && !modal ? 'standard' : variantProp;
      const contentVariant = modal
        ? variant === 'detached'
          ? 'detachedModal'
          : 'modal'
        : 'standard';
      const variantStyles = sideSheetVariantStyles[variant];
      const { combineStyles, getStyles, globalStyles } = useStyles({
        name: 'SideSheet',
        styles: [sideSheetStyles, variantStyles, styles],
      });

      const [opened, setOpened] = useControlledValue({
        controlled: openedProp,
        default: !!openedProp,
        name: 'SideSheet',
      });
      const floating = useFloating({
        open: opened && !disabled,
        onOpenChange: (opened, event, reason) => {
          onOpenChange?.(opened, event, reason);
          setOpened(opened);
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
            opened,
            getProps: interactions.getReferenceProps,
            setRef: floating.refs.setReference,
          })
        : trigger;

      const sideSheetRef = useMergeRefs([
        forwardedRef,
        floating.refs.setFloating,
      ]);

      return (
        <>
          {triggerElement}

          {transitionStatus.isMounted ? (
            <Portal root={root}>
              {modal ? (
                <Scrim floatingContext={floating.context} lockScroll />
              ) : null}
              <div
                {...getStyles(
                  sideSheetTheme,
                  globalStyles,
                  'host',
                  `host$${anchor}`,
                )}
              >
                <FloatingFocusManager
                  context={floating.context}
                  visuallyHiddenDismiss={true}
                  modal={modal}
                  disabled={!modal}
                >
                  <FloatingTransition
                    status={transitionStatus.status}
                    placement={anchor}
                    origin='edge'
                    pattern='enterExitOffScreen'
                  >
                    <SideSheetContent
                      sx={[combineStyles('sideSheetContent'), sx]}
                      styles={innerStyles?.sideSheetContent}
                      onClose={(event) =>
                        floating.context.onOpenChange(
                          false,
                          event.nativeEvent,
                          'click',
                        )
                      }
                      {...other}
                      {...interactions.getFloatingProps()}
                      variant={contentVariant}
                      ref={sideSheetRef}
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
