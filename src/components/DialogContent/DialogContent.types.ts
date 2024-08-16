import type { IBaseProps } from '../Base';
import type { IDialogContentStylesKey } from './DialogContent.styles';

export type IDialogActionsRenderProps = {
  close: () => void;
};

export type IDialogContentProps = IBaseProps<IDialogContentStylesKey> & {
  type?: 'alert';
  scrollable?: boolean;
  icon?: React.ReactNode;
  headline: React.ReactNode;
  children: React.ReactNode;
  actions:
    | React.ReactNode
    | ((props: IDialogActionsRenderProps) => React.ReactNode);
  onClose?: () => void;
};
