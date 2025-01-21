import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type {
  bottomSheetContentTheme,
  IBottomSheetContentThemeFactory,
} from './BottomSheetContent.css';

export const bottomSheetContentVariants = ['standard', 'minimized'] as const;
export type IBottomSheetContentVariant =
  (typeof bottomSheetContentVariants)[number];

export type IBottomSheetContentRenderProps = {
  close: (event: React.MouseEvent) => void;
};

export interface IBottomSheetContentOwnProps {
  onClose?: (event: React.MouseEvent) => void;
  children?:
    | React.ReactNode
    | ((props: IBottomSheetContentRenderProps) => React.ReactNode);
  draggable?: boolean;
}

export interface IBottomSheetContentProps
  extends IBoxProps,
    IComponentThemeProps<IBottomSheetContentThemeFactory>,
    IBottomSheetContentOwnProps {}

export type IBottomSheetContentFactory = IComponentFactory<{
  props: IBottomSheetContentProps;
  ref: HTMLDivElement;
  theme: typeof bottomSheetContentTheme;
}>;
