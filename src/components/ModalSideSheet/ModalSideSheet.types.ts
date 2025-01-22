import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { ISideSheetContentOwnProps } from '../SideSheetContent';
import type {
  IModalSideSheetThemeFactory,
  modalSideSheetTheme,
} from './ModalSideSheet.css';

export interface IModalSideSheetOwnProps extends ISideSheetContentOwnProps {
  opened?: boolean;
  detached?: boolean;
  root?: HTMLElement | null;
}

export interface IModalSideSheetProps
  extends IBoxProps,
    IComponentThemeProps<IModalSideSheetThemeFactory>,
    IModalSideSheetOwnProps {}

export type IModalSideSheetFactory = IComponentFactory<{
  props: IModalSideSheetProps;
  ref: HTMLDivElement;
  theme: typeof modalSideSheetTheme;
}>;
