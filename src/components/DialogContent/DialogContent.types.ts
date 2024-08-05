import type { IBaseProps } from '../Base';
import type { IDialogContentStylesKey } from './DialogContent.styles';

export type IDialogActionsRenderProps = {
  close: (event: React.MouseEvent) => void;
};

export type IDialogContentProps = IBaseProps<IDialogContentStylesKey> &
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
