import { forwardRef, useMemo } from 'react';
import { isFunction } from 'lodash';
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

import type {
  IPolymorphicRef,
  IWithAsProp,
} from '@/helpers/react/polymorphicComponentTypes';
import type {
  IDialogProps,
  IDialogOwnProps,
  DIALOG_DEFAULT_TAG,
} from './Dialog.types';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import {
  DialogContent,
  type IDialogContentOwnProps,
} from '@/components/atoms/DialogContent';
import { Scrim } from '@/components/atoms/Scrim';
import { Portal } from '@/components/utils/Portal';
import { useControlledValue } from '@/hooks/useControlledValue';
import { extendFloatingProps } from '@/helpers/extendFloatingProps';
import { dialogStyles } from './Dialog.styles';

// https://github.com/material-components/material-web/blob/main/dialog/internal/dialog.ts

type IDialog = <TRoot extends React.ElementType = typeof DIALOG_DEFAULT_TAG>(
  props: IDialogProps<TRoot>,
) => React.ReactNode;

export const Dialog: IDialog = forwardRef(function Dialog<
  TRoot extends React.ElementType = typeof DIALOG_DEFAULT_TAG,
>(props: IDialogProps<TRoot>, forwardedRef?: IPolymorphicRef<TRoot>) {
  const {
    styles,
    sx,
    innerStyles,
    as,
    trigger,
    isOpen: isOpenProp,
    disabled,
    onOpenChange,
    nonDismissable,
    ...other
  } = props as IWithAsProp<IDialogOwnProps>;

  const { overridenStyles } = useComponentTheme('Dialog');
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(dialogStyles, styles),
    [styles],
  );
  const sxf = useMemo(
    () => stylePropsFactory(stylesCombinator),
    [stylesCombinator],
  );

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
    outsidePressEvent: 'mousedown',
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
          <Scrim context={floating.context} lockScroll>
            <FloatingFocusManager context={floating.context}>
              <div
                {...sxf(
                  overridenStyles,
                  `transition$${transitionStatus.status}`,
                  sx,
                )}
              >
                <DialogContent
                  as={as}
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
                  {...extendFloatingProps<IDialogContentOwnProps>(
                    interactions.getFloatingProps,
                    other,
                  )}
                  ref={dialogRef}
                />
              </div>
            </FloatingFocusManager>
          </Scrim>
        </Portal>
      ) : null}
    </>
  );
});
