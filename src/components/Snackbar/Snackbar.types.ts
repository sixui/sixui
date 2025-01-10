import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { ISnackbarContentOwnProps } from '../SnackbarContent';
import type { ISnackbarThemeFactory, snackbarTheme } from './Snackbar.css';

export interface ISnackbarOwnProps extends ISnackbarContentOwnProps {
  opened?: boolean;
  justify?: 'start' | 'center';
  autoHideDuration?: number;
}

export interface ISnackbarProps
  extends IBoxProps,
    IComponentThemeProps<ISnackbarThemeFactory>,
    ISnackbarOwnProps {}

export type ISnackbarFactory = IComponentFactory<{
  props: ISnackbarProps;
  ref: HTMLDivElement;
  theme: typeof snackbarTheme;
}>;
