import { cloneElement, forwardRef, useMemo } from 'react';
import {
  FloatingFocusManager,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  useTransitionStatus,
  type OpenChangeReason,
} from '@floating-ui/react';

import type {
  IPolymorphicComponentPropsWithRef,
  IPolymorphicRef,
  IWithAsProp,
} from '@/helpers/react/polymorphicComponentTypes';
import type { IVisualState } from '@/hooks/useVisualState';
import type { IDialogStyleKey } from './Dialog.styledefs';
import type { IOmit } from '@/helpers/types';
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

// https://github.com/material-components/material-web/blob/main/dialog/internal/dialog.ts

const DEFAULT_TAG = 'div';

export type IDialogRenderProps = {
  isOpen: boolean;
};

export type IDialogOwnProps = IOmit<IDialogContentOwnProps, 'onClose'> &
  Pick<React.AriaAttributes, 'aria-label'> & {
    open?: boolean;
    button?:
      | React.ReactElement
      | ((props: IDialogRenderProps) => React.ReactElement);
    onOpenChange?: (
      open: boolean,
      event?: Event,
      reason?: OpenChangeReason,
    ) => void;
  };

export type IDialogProps<TRoot extends React.ElementType = typeof DEFAULT_TAG> =
  IPolymorphicComponentPropsWithRef<TRoot, IDialogOwnProps>;

type IDialog = <TRoot extends React.ElementType = typeof DEFAULT_TAG>(
  props: IDialogProps<TRoot>,
) => React.ReactNode;

export const Dialog: IDialog = forwardRef(function Dialog<
  TRoot extends React.ElementType = typeof DEFAULT_TAG,
>(props: IDialogProps<TRoot>, forwardedRef?: IPolymorphicRef<TRoot>) {
  const {
    as,
    button,
    open: openProp,
    onOpenChange,
    ...other
  } = props as IWithAsProp<IDialogOwnProps>;

  const { theme } = useComponentTheme('Dialog');
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(theme.styles),
    [theme.styles],
  );
  const sxf = useMemo(
    () => stylePropsFactory<IDialogStyleKey>(stylesCombinator),
    [stylesCombinator],
  );

  const [isOpen, setIsOpen] = useControlledValue({
    controlled: openProp,
    default: !!openProp,
    name: 'Dialog',
  });
  const floating = useFloating<HTMLButtonElement>({
    open: isOpen,
    onOpenChange: (isOpen, event, reason) => {
      onOpenChange?.(isOpen, event, reason);
      setIsOpen(isOpen);
    },
  });
  const click = useClick(floating.context);
  const role = useRole(floating.context);
  const dismiss = useDismiss(floating.context, {
    outsidePressEvent: 'mousedown',
  });
  const interactions = useInteractions([click, role, dismiss]);
  const transitionStatus = useTransitionStatus(floating.context, {
    duration: 150, // motionVars.duration$short3
  });

  const bag: IDialogRenderProps = {
    isOpen: !!isOpen,
  };
  const openVisualState: IVisualState = { hovered: true };
  const openProps = { visualState: openVisualState };

  return (
    <>
      {button
        ? cloneElement(typeof button === 'function' ? button(bag) : button, {
            ...(transitionStatus.isMounted ? openProps : undefined),
            ref: floating.refs.setReference,
            ...interactions.getReferenceProps(),
          })
        : null}

      {transitionStatus.isMounted ? (
        <Portal>
          <Scrim context={floating.context} lockScroll>
            <FloatingFocusManager context={floating.context}>
              <div
                {...interactions.getFloatingProps()}
                {...sxf(`transition$${transitionStatus.status}`)}
                ref={floating.refs.setFloating}
              >
                <DialogContent
                  as={as}
                  onClose={(event) =>
                    floating.context.onOpenChange(
                      false,
                      event.nativeEvent,
                      'click',
                    )
                  }
                  {...other}
                  ref={forwardedRef}
                />
              </div>
            </FloatingFocusManager>
          </Scrim>
        </Portal>
      ) : null}
    </>
  );
});
