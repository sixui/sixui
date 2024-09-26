import type { IOmit } from '~/helpers/types';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type {
  IDialogContentOwnProps,
  IDialogContentProps,
} from '../DialogContent';
import type { IPopoverBaseOwnProps } from '../PopoverBase';
import type { dialogTheme, IDialogThemeFactory } from './Dialog.css';
import { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';

export interface IDialogOwnProps
  extends IOmit<IPopoverBaseOwnProps, 'children' | 'contentRenderer'>,
    IOmit<IDialogContentOwnProps, 'onClose'> {
  /**
   * Contains the props for all slots within the component.
   */
  slotProps?: IPopoverBaseOwnProps['slotProps'] & {
    dialogContent?: Partial<IDialogContentProps>;
  };

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
