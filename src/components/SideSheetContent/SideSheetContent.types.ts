import type { IHorizontalSide, IOmit } from '~/helpers/types';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { IPaperBaseOwnProps } from '../PaperBase';
import type {
  ISideSheetContentThemeFactory,
  sideSheetContentTheme,
} from './SideSheetContent.css';

export type ISideSheetContentVariant = 'standard' | 'modal' | 'detachedModal';

export type ISideSheetContentRenderProps = {
  close: (event: React.MouseEvent) => void;
};

export interface ISideSheetContentOwnProps
  extends IOmit<IPaperBaseOwnProps, 'children'> {
  onClose?: (event?: React.MouseEvent) => void;
  children?:
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
  side?: IHorizontalSide;
  divider?: boolean;
}

export interface ISideSheetContentProps
  extends IBoxProps,
    IComponentThemeProps<ISideSheetContentThemeFactory>,
    ISideSheetContentOwnProps {}

export type ISideSheetContentFactory = IComponentFactory<{
  props: ISideSheetContentProps;
  ref: HTMLDivElement;
  theme: typeof sideSheetContentTheme;
  variant: ISideSheetContentVariant | false;
}>;
