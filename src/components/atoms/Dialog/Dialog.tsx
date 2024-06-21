import {
  forwardRef,
  useRef,
} from 'react';

import type {
  IPolymorphicComponentPropsWithRef,
  IPolymorphicRef,
  IWithAsProp,
} from '@/helpers/react/polymorphicComponentTypes';
import { Scrim } from '@/components/atoms/Scrim';
import { DialogContent, type IDialogContentOwnProps } from '../DialogContent';

// https://github.com/material-components/material-web/blob/main/dialog/internal/dialog.ts

const DEFAULT_TAG = 'div';

export type IDialogOwnProps = IDialogContentOwnProps &
  Pick<React.AriaAttributes, 'aria-label'> & {
    open?: boolean;
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
    open,
    ...other
  } = props as IWithAsProp<IDialogOwnProps>;

  const backdropClick = useRef(false);
  const handleMouseDown = (event: React.MouseEvent): void => {
    // We don't want to close the dialog when clicking the dialog content.
    // Make sure the event starts and ends on the same DOM element.
    backdropClick.current = event.target === event.currentTarget;
  };

  const handleScrimClick = (event: React.MouseEvent): void => {
    // Ignore the events not coming from the "backdrop".
    if (!backdropClick.current) {
      return;
    }

    backdropClick.current = false;
    other.onClose?.(event, 'backdropClick');
  };

  return (
    <Scrim open={open} onClick={handleScrimClick} onMouseDown={handleMouseDown}>
      <DialogContent as={as} {...other} ref={forwardedRef} />
    </Scrim>
  );
});
