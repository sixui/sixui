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
import stylex from '@stylexjs/stylex';

import type { IDrawerProps } from './Drawer.types';
import { createPolymorphicComponent } from '~/helpers/react/polymorphicComponentTypes';
import { isFunction } from '~/helpers/isFunction';
import { useControlledValue } from '~/hooks/useControlledValue';
import { useStyles } from '~/hooks/useStyles';
import { Scrim } from '../Scrim';
import { Portal } from '../Portal';
import { FloatingTransition } from '../FloatingTransition';
import { drawerStyles } from './Drawer.styles';
import { drawerVariantStyles } from './variants';

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
        disabled,
        onOpenChange,
        variant = 'standard',
        anchor = 'left',
        children,
        ...other
      } = props;

      // FIXME: support detached
      const contentVariant = variant === 'detached' ? 'detachedModal' : 'modal';
      const variantStyles = drawerVariantStyles[variant];
      const { getStyles, globalStyles } = useStyles({
        name: 'Drawer',
        styles: [drawerStyles, variantStyles, styles],
      });

      const [isOpen, setIsOpen] = useControlledValue({
        controlled: isOpenProp,
        default: !!isOpenProp,
        name: 'Drawer',
      });
      // FIXME: use PopoverBase?
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
      const orientation = ['left', 'right'].includes(anchor)
        ? 'horizontal'
        : 'vertical';

      const triggerElement = isFunction(trigger)
        ? trigger({
            isOpen,
            getProps: interactions.getReferenceProps,
            setRef: floating.refs.setReference,
          })
        : trigger;

      const drawerRef = useMergeRefs([forwardedRef, floating.refs.setFloating]);

      return (
        <>
          {triggerElement}

          {transitionStatus.isMounted ? (
            <Portal root={root}>
              <Scrim floatingContext={floating.context} lockScroll />
              <div
                {...getStyles(
                  globalStyles,
                  'host',
                  `host$${orientation}`,
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
                    <div
                      {...stylex.props(sx)}
                      {...interactions.getFloatingProps()}
                      {...other}
                      ref={drawerRef}
                    >
                      {isFunction(children)
                        ? children({
                            close: (event) =>
                              floating.context.onOpenChange(
                                false,
                                event?.nativeEvent,
                                'click',
                              ),
                          })
                        : children}
                    </div>
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
