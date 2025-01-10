import type { IOmit } from '~/helpers/types';
import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { IDialogContentOwnProps } from '../DialogContent';
import type { IPopoverBaseOwnProps } from '../PopoverBase';
import type { dialogTheme, IDialogThemeFactory } from './Dialog.css';

export interface IDialogOwnProps
  extends IOmit<IPopoverBaseOwnProps, 'children' | 'contentRenderer'>,
    IOmit<IDialogContentOwnProps, 'onClose'> {
  children?: React.ReactNode;
}

export interface IDialogProps
  extends IBoxProps,
    IComponentThemeProps<IDialogThemeFactory>,
    IDialogOwnProps {}

export type IDialogFactory = IPolymorphicComponentFactory<{
  props: IDialogProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
  theme: typeof dialogTheme;
}>;
