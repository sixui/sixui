import type { IBoxProps } from '~/components/Box';
import type { IPopoverBaseOwnProps } from '~/components/PopoverBase';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IOmit } from '~/utils/types';
import type { dialogTheme, IDialogThemeFactory } from './Dialog.css';
import type { IDialogContentOwnProps } from './DialogContent';

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
