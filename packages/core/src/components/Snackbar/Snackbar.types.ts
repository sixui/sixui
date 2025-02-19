import type { IBoxProps } from '~/components/Box';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { ISnackbarThemeFactory, snackbarTheme } from './Snackbar.css';
import type { ISnackbarContentOwnProps } from './SnackbarContent';

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
