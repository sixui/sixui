import type { IOmit } from '~/helpers/types';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { ISideSheetContentOwnProps } from '../SideSheetContent';
import type { ISideSheetThemeFactory, sideSheetTheme } from './SideSheet.css';

export interface ISideSheetOwnProps
  extends IOmit<ISideSheetContentOwnProps, 'side'> {
  detached?: boolean;
  standardOpened?: boolean;
  modalOpened?: boolean;
  side?: 'left' | 'right';
  root?: HTMLElement | null;
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
