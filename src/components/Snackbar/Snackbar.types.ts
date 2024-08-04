import type { IContainerProps, IOmit } from '~/helpers/types';
import type { ISnackbarContentProps } from '../SnackbarContent';
import type { ISnackbarStylesKey } from './Snackbar.styles';

export type ISnackbarProps = IContainerProps<ISnackbarStylesKey> &
  IOmit<ISnackbarContentProps, 'styles' | 'sx' | 'onClose'> & {
    open?: boolean;
    onClose?: () => void;
    horizontalOrigin?: 'left' | 'center';
    autoHideDuration?: number;
  };
