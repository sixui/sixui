import type { IOmit } from '~/helpers/types';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { ISideSheetContentOwnProps } from '../SideSheetContent';
import type {
  IModalSideSheetThemeFactory,
  modalSideSheetTheme,
} from './ModalSideSheet.css';

export interface IModalSideSheetOwnProps
  extends IOmit<ISideSheetContentOwnProps, 'side'> {
  opened?: boolean;
  detached?: boolean;
  side?: 'left' | 'right';
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
