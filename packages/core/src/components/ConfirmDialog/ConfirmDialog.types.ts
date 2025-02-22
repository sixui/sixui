import type { IBoxProps } from '~/components/Box';
import type { IButtonProps } from '~/components/Button';
import type { IDialogOwnProps } from '~/components/Dialog';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IMaybeAsync, IOmit } from '~/utils/types';
import type {
  confirmDialogTheme,
  IConfirmDialogThemeFactory,
} from './ConfirmDialog.css';

export interface IConfirmDialogOwnProps
  extends IOmit<IDialogOwnProps, 'actions'> {
  onCancel?: () => IMaybeAsync<unknown>;
  onConfirm?: () => IMaybeAsync<unknown>;
  cancelProps?: IButtonProps;
  confirmProps?: IButtonProps;
  labels?: {
    confirm?: string;
    cancel?: string;
  };
  danger?: boolean;
}

export interface IConfirmDialogProps
  extends IBoxProps,
    IComponentThemeProps<IConfirmDialogThemeFactory>,
    IConfirmDialogOwnProps {}

export type IConfirmDialogFactory = IComponentFactory<{
  props: IConfirmDialogProps;
  ref: HTMLDivElement;
  theme: typeof confirmDialogTheme;
}>;
