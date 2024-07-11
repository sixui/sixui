import type { IContainerProps, IOmit } from '@/helpers/types';
import type { ISnackbarContentProps } from '@/components/atoms/SnackbarContent';
import type { ISnackbarStyleKey } from './Snackbar.styledefs';

export type ISnackbarProps = IContainerProps<ISnackbarStyleKey> &
  IOmit<ISnackbarContentProps, 'styles' | 'sx' | 'onClose'> & {
    open?: boolean;
    onClose?: () => void;
    horizontalOrigin?: 'left' | 'center';
    autoHideDuration?: number;
  };
