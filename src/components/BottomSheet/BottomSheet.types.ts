import type { IOmit } from '~/helpers/types';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBottomSheetContentOwnProps } from '../BottomSheetContent';
import type { IBoxProps } from '../Box';
import type { IPopoverBaseOwnProps } from '../PopoverBase';
import type {
  bottomSheetTheme,
  IBottomSheetThemeFactory,
} from './BottomSheet.css';

export interface IBottomSheetOwnProps
  extends IOmit<IPopoverBaseOwnProps, 'children' | 'contentRenderer'>,
    IOmit<IBottomSheetContentOwnProps, 'onClose'> {
  children?: React.ReactNode;
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
