import type { IOmit, IZeroOrMore, ICompiledStyles } from '~/helpers/types';
import type { IBaseProps } from '../Base';
import type {
  IDialogContentProps,
  IDialogContentStylesKey,
} from '../DialogContent';
import type { IPortalProps } from '../Portal';
import type { IDialogStylesKey } from './Dialog.styles';

export type IDialogProps = Pick<IPortalProps, 'root'> &
  IBaseProps<IDialogStylesKey> &
  IOmit<IDialogContentProps, 'styles' | 'onClose'> & {
    innerStyles?: {
      dialogContent?: IZeroOrMore<ICompiledStyles<IDialogContentStylesKey>>;
    };
    opened?: boolean;
    onClose?: () => void;
    disabled?: boolean;
    modal?: boolean;
  };
