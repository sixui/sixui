import type { IOmit } from '~/helpers/types';
import type { IBaseProps } from '../Base';
import type { ISnackbarContentProps } from '../SnackbarContent';
import type { ISnackbarStylesKey } from './Snackbar.styles';

export type ISnackbarProps = IBaseProps<ISnackbarStylesKey> &
  IOmit<ISnackbarContentProps, 'styles' | 'sx' | 'onClose'> & {
    open?: boolean;
    onClose?: () => void;
    horizontalOrigin?: 'left' | 'center';
    autoHideDuration?: number;
  };
