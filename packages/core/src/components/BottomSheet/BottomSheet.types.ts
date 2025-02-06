import type { IBoxProps } from '~/components/Box';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type {
  bottomSheetTheme,
  IBottomSheetThemeFactory,
} from './BottomSheet.css';
import type { IBottomSheetContentOwnProps } from './BottomSheetContent';

export interface IBottomSheetOwnProps extends IBottomSheetContentOwnProps {
  opened?: boolean;
  modal?: boolean;
  onClose?: () => void;
  onClosed?: () => void;
  detached?: boolean;
  fullHeight?: boolean;
}

export interface IBottomSheetProps
  extends IBoxProps,
    IComponentThemeProps<IBottomSheetThemeFactory>,
    IBottomSheetOwnProps {}

export type IBottomSheetFactory = IComponentFactory<{
  props: IBottomSheetProps;
  ref: HTMLDivElement;
  theme: typeof bottomSheetTheme;
}>;
