import type { IContainerProps } from '~/helpers/types';
import type { IDialogContentStylesKey } from './DialogContent.styles';
import type { IPolymorphicComponentPropsWithRef } from '~/helpers/react/polymorphicComponentTypes';

export const DIALOG_CONTENT_DEFAULT_TAG = 'div';

export type IDialogActionsRenderProps = {
  close: (event: React.MouseEvent) => void;
};

export type IDialogContentOwnProps = IContainerProps<IDialogContentStylesKey> &
  Pick<React.AriaAttributes, 'aria-label'> & {
    type?: 'alert';
    scrollable?: boolean;
    icon?: React.ReactNode;
    headline: React.ReactNode;
    children: React.ReactNode;
    actions:
      | React.ReactNode
      | ((props: IDialogActionsRenderProps) => React.ReactNode);
    onClose?: (event: React.MouseEvent) => void;
  };

export type IDialogContentProps<
  TRoot extends React.ElementType = typeof DIALOG_CONTENT_DEFAULT_TAG,
> = IPolymorphicComponentPropsWithRef<TRoot, IDialogContentOwnProps>;
