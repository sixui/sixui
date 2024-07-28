import type { ICompiledStyles, IZeroOrMore } from '~/helpers/types';
import type { IPolymorphicComponentPropsWithRef } from '~/helpers/react/polymorphicComponentTypes';
import type { ICircularProgressIndicatorStylesKey } from '~/components/CircularProgressIndicator';
import type { IButtonBaseOwnProps } from '~/components/ButtonBase';

export type IButtonVariant =
  | 'elevated'
  | 'filled'
  | 'filledTonal'
  | 'outlined'
  | 'text'
  | 'danger'
  | 'snackbar';

export const BUTTON_DEFAULT_TAG = 'button';

export type IButtonOwnProps = IButtonBaseOwnProps & {
  innerStyles?: IButtonBaseOwnProps['innerStyles'] & {
    circularProgressIndicator?: IZeroOrMore<
      ICompiledStyles<ICircularProgressIndicatorStylesKey>
    >;
  };
  withLeadingIcon?: boolean;
  withTrailingIcon?: boolean;
  variant?: IButtonVariant | false;
  icon?: React.ReactNode;
  trailingIcon?: boolean;
  loading?: boolean;
  loadingAnimation?: 'progressIndicator' | 'halfSpin' | 'none';
  loadingText?: string;
};

export type IButtonProps<
  TRoot extends React.ElementType = typeof BUTTON_DEFAULT_TAG,
> = IPolymorphicComponentPropsWithRef<TRoot, IButtonOwnProps>;
