import type { IBottomSheetContentStylesKey } from './BottomSheetContent.styles';
import { IBaseProps } from '~/components/Base';

export type IBottomSheetContentVariant = 'standard' | 'modal';

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
  };
