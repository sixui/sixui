import type { IBoxProps } from '~/components/Box';
import type { IPaperBaseOwnProps } from '~/components/PaperBase';
import type { IComponentThemeProps } from '~/components/ThemeProvider';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IHorizontalSide, IOmit } from '~/utils/types';
import type {
  ISideSheetContentThemeFactory,
  sideSheetContentTheme,
} from './SideSheetContent.css';

export const sideSheetContentVariants = [
  'standard',
  'modal',
  'detachedModal',
] as const;
export type ISideSheetContentVariant =
  (typeof sideSheetContentVariants)[number];

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
