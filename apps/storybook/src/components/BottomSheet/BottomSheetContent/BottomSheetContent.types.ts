import type { IBoxProps } from '~/components/Box';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type {
  bottomSheetContentTheme,
  IBottomSheetContentThemeFactory,
} from './BottomSheetContent.css';
import { IMaybeAsync } from '~/helpers/types';

export const bottomSheetContentVariants = ['standard', 'minimized'] as const;
export type IBottomSheetContentVariant =
  (typeof bottomSheetContentVariants)[number];

export type IBottomSheetContentRenderProps = {
  close: (event: React.MouseEvent) => void;
};

export interface IBottomSheetContentOwnProps {
  onClose?: (event?: React.MouseEvent) => IMaybeAsync<unknown>;
  children?:
    | React.ReactNode
    | ((props: IBottomSheetContentRenderProps) => React.ReactNode);
  draggable?: boolean;
  showCloseButton?: boolean;
  closeIcon?: React.ReactNode;
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
