import { cloneElement, forwardRef, useMemo, useState } from 'react';
import {
  FloatingFocusManager,
  useClick,
  useDismiss,
  useFloating,
  useId,
  useInteractions,
  useRole,
  useTransitionStatus,
} from '@floating-ui/react';

import type {
  IPolymorphicComponentPropsWithRef,
  IPolymorphicRef,
  IWithAsProp,
} from '@/helpers/react/polymorphicComponentTypes';
import type { IVisualState } from '@/hooks/useVisualState';
import type { IDialogStyleKey } from './Dialog.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import {
  DialogContent,
  type IDialogContentOwnProps,
} from '@/components/atoms/DialogContent';
import { Scrim } from '@/components/atoms/Scrim';
import { Portal } from '@/components/utils/Portal';

// https://github.com/material-components/material-web/blob/main/dialog/internal/dialog.ts

const DEFAULT_TAG = 'div';

export type IDialogRenderProps = {
  open: boolean;
};

export type IDialogOwnProps = IDialogContentOwnProps &
  Pick<React.AriaAttributes, 'aria-label'> & {
    button:
      | React.ReactElement
      | ((props: IDialogRenderProps) => React.ReactElement);
  };

export type IDialogProps<TRoot extends React.ElementType = typeof DEFAULT_TAG> =
  IPolymorphicComponentPropsWithRef<TRoot, IDialogOwnProps>;

type IDialog = <TRoot extends React.ElementType = typeof DEFAULT_TAG>(
  props: IDialogProps<TRoot>,
) => React.ReactNode;

export const Dialog: IDialog = forwardRef(function Dialog<
  TRoot extends React.ElementType = typeof DEFAULT_TAG,
>(props: IDialogProps<TRoot>, forwardedRef?: IPolymorphicRef<TRoot>) {
  const { as, button, onClose, ...other } =
    props as IWithAsProp<IDialogOwnProps>;

  const { theme } = useComponentTheme('Dialog');
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(theme.styles),
    [theme.styles],
  );
  const sxf = useMemo(
    () => stylePropsFactory<IDialogStyleKey>(stylesCombinator),
    [stylesCombinator],
  );

  const [isOpen, setIsOpen] = useState(false);
  const floating = useFloating<HTMLButtonElement>({
    open: isOpen,
    onOpenChange: setIsOpen,
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
  const headingId = useId();
  const descriptionId = useId();

  const bag: IDialogRenderProps = {
    open: isOpen,
  };
  const openVisualState: IVisualState = { hovered: true };
  const openProps = { visualState: openVisualState };

  return (
    <>
      {cloneElement(typeof button === 'function' ? button(bag) : button, {
        ...(transitionStatus.isMounted ? openProps : undefined),
        ref: floating.refs.setReference,
        ...interactions.getReferenceProps(),
      })}
      // FIXME: form in dialog
      {transitionStatus.isMounted ? (
        <Portal>
          <Scrim
            context={floating.context}
            open={isOpen}
            lockScroll
          >
            <FloatingFocusManager context={floating.context}>
              <div
                aria-labelledby={headingId}
                aria-describedby={descriptionId}
                {...interactions.getFloatingProps()}
                {...sxf(`transition$${transitionStatus.status}`)}
                ref={floating.refs.setFloating}
                // FIXME: use headingId and descriptionId
              >
                <DialogContent
                  as={as}
                  onClose={() => setIsOpen(false)}
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
