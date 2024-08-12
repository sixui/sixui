import type { IBaseProps } from '~/components/Base';
import type { ISideSheetContentStylesKey } from './SideSheetContent.styles';

export type ISideSheetContentVariant = 'standard' | 'modal' | 'detached';

export type ISideSheetContentRenderProps = {
  close: (event: React.MouseEvent) => void;
};

export type ISideSheetContentProps = IBaseProps<ISideSheetContentStylesKey> & {
  variant?: ISideSheetContentVariant;
  onClose?: (event: React.MouseEvent) => void;
  children:
    | React.ReactNode
    | ((props: ISideSheetContentRenderProps) => React.ReactNode);
};
