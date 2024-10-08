import type { IBaseProps } from '~/components/Base';
import type { IBottomSheetContentStylesKey } from './BottomSheetContent.styles';

export type IBottomSheetContentVariant = 'standard' | 'modal' | 'minimized';

export type IBottomSheetContentRenderProps = {
  close: (event: React.MouseEvent) => void;
};

export type IBottomSheetContentProps =
  IBaseProps<IBottomSheetContentStylesKey> & {
    variant?: IBottomSheetContentVariant;
    onClose?: (event: React.MouseEvent) => void;
    children:
      | React.ReactNode
      | ((props: IBottomSheetContentRenderProps) => React.ReactNode);
    draggable?: boolean;
  };
