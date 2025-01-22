import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { ISideSheetContentOwnProps } from '../SideSheetContent';
import type { ISideSheetThemeFactory, sideSheetTheme } from './SideSheet.css';

export interface ISideSheetOwnProps extends ISideSheetContentOwnProps {
  detached?: boolean;
  standardOpened?: boolean;
  modalOpened?: boolean;
  root?: HTMLElement | null;
  modalRef?: React.RefObject<HTMLDivElement>;
}

export interface ISideSheetProps
  extends IBoxProps,
    IComponentThemeProps<ISideSheetThemeFactory>,
    ISideSheetOwnProps {}

export type ISideSheetFactory = IComponentFactory<{
  props: ISideSheetProps;
  ref: HTMLDivElement;
  theme: typeof sideSheetTheme;
}>;
