import type { OpenChangeReason, ReferenceType } from '@floating-ui/react';

import type {
  IContainerProps,
  IOmit,
  IZeroOrMore,
  ICompiledStyles,
} from '~/helpers/types';
import type { IPolymorphicComponentPropsWithRef } from '~/helpers/react/polymorphicComponentTypes';
import type {
  IDialogContentOwnProps,
  IDialogContentStylesKey,
} from '../DialogContent';
import type { IExtendedHtmlFloatingProps } from '~/helpers/extendFloatingProps';

export const DIALOG_DEFAULT_TAG = 'div';

export type IDialogTriggerRenderProps = {
  /**
   * Whether the dialog is open.
   */
  isOpen: boolean;

  /**
   * A callback to set the trigger element.
   */
  setRef: ((node: ReferenceType | null) => void) | null;

  /**
   * A function that returns the props to apply to the trigger element.
   *
   * @param userProps - All event handlers you pass in should be done so through
   * the this argument. This is because your handler may be either overwritten
   * or overwrite one of the Floating UI hooks' handlers.
   */
  getProps: (
    userProps?: IExtendedHtmlFloatingProps,
  ) => IExtendedHtmlFloatingProps;
};

export type IDialogOwnProps = IContainerProps &
  IOmit<IDialogContentOwnProps, 'onClose' | 'styles'> &
  Pick<React.AriaAttributes, 'aria-label'> & {
    innerStyles?: {
      dialogContent?: IZeroOrMore<ICompiledStyles<IDialogContentStylesKey>>;
    };

    /**
     * Whether the dialog is visible. Passing this prop puts the dialog in
     * controlled mode, where the only way to change its visibility is by
     * updating this property. If `disabled={true}`, this prop will be ignored,
     * and the floating will remain closed.
     *
     * @defaultValue undefined
     */
    isOpen?: boolean;

    /**
     * Prevents the dialog from appearing when `true`.
     */
    disabled?: boolean;

    /**
     * The trigger element that will open the dialog when interacted with.
     */
    trigger?:
      | React.ReactNode
      | ((props: IDialogTriggerRenderProps) => React.ReactElement);

    /**
     * An event callback that is invoked when the floating element is opened or
     * closed in controlled mode.
     */
    onOpenChange?: (
      open: boolean,
      event?: Event,
      reason?: OpenChangeReason,
    ) => void;

    nonDismissable?: boolean;
  };

export type IDialogProps<
  TRoot extends React.ElementType = typeof DIALOG_DEFAULT_TAG,
> = IPolymorphicComponentPropsWithRef<TRoot, IDialogOwnProps>;
