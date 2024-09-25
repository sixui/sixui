import type { IOmit } from '~/helpers/types';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { IDialogContentOwnProps } from '../DialogContent';
import type { IPopoverBaseOwnProps } from '../PopoverBase';
import type { dialogTheme, IDialogThemeFactory } from './Dialog.css';

export interface IDialogOwnProps
  extends IOmit<IPopoverBaseOwnProps, 'children' | 'contentRenderer'>,
    IOmit<IDialogContentOwnProps, 'onClose'> {
  modal?: boolean;
}

export interface IDialogProps
  extends IBoxProps,
    IComponentThemeProps<IDialogThemeFactory>,
    IDialogOwnProps {}

export type IDialogFactory = IComponentFactory<{
  props: IDialogProps;
  ref: HTMLDivElement;
  theme: typeof dialogTheme;
}>;
