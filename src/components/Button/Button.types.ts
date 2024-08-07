import type { ICompiledStyles, IZeroOrMore } from '~/helpers/types';
import type { ICircularProgressIndicatorStylesKey } from '../CircularProgressIndicator';
import type { IButtonBaseProps } from '../ButtonBase';

export type IButtonVariant =
  | 'elevated'
  | 'filled'
  | 'filledTonal'
  | 'outlined'
  | 'text'
  | 'danger'
  | 'snackbar';

export type IButtonProps = IButtonBaseProps & {
  innerStyles?: IButtonBaseProps['innerStyles'] & {
    circularProgressIndicator?: IZeroOrMore<
      ICompiledStyles<ICircularProgressIndicatorStylesKey>
    >;
  };
  variant?: IButtonVariant | false;
  icon?: React.ReactNode;
  trailingIcon?: boolean;
  loading?: boolean;
  loadingAnimation?: 'progressIndicator' | 'halfSpin' | 'none';
  loadingText?: string;
};
