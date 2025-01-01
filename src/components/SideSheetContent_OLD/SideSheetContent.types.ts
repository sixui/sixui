import type { IBaseProps } from '~/components/Base';
import type { ISideSheetContentStylesKey } from './SideSheetContent.styles';

export type ISideSheetContentVariant = 'standard' | 'modal' | 'detachedModal';

export type ISideSheetContentRenderProps = {
  close: (event: React.MouseEvent) => void;
};

export type ISideSheetContentProps = IBaseProps<ISideSheetContentStylesKey> & {
  variant?: ISideSheetContentVariant;
  onClose?: (event?: React.MouseEvent) => void;
  children:
    | React.ReactNode
    | ((props: ISideSheetContentRenderProps) => React.ReactNode);
  headline?: React.ReactNode;
  leadingActions?: React.ReactNode;
  trailingActions?: React.ReactNode;
  showCloseButton?: boolean;
  closeIcon?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  bottomActions?:
    | React.ReactNode
    | ((props: ISideSheetContentRenderProps) => React.ReactNode);
  anchor?: 'left' | 'right';
  divider?: boolean;
};
