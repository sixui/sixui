import type {
  IAny,
  ICompiledStyles,
  IOmit,
  IMaybeAsync,
  IZeroOrMore,
} from '@/helpers/types';
import type { IPolymorphicComponentPropsWithRef } from '@/helpers/react/polymorphicComponentTypes';
import type { ICircularProgressIndicatorStyleKey } from '@/components/atoms/CircularProgressIndicator';
import type { IButtonBaseOwnProps } from '@/components/atoms/ButtonBase';
import type { IButtonVariant } from './Button.styledefs';

export const BUTTON_DEFAULT_TAG = 'button';

export type IButtonOwnProps = IOmit<
  IButtonBaseOwnProps,
  'withLeadingIcon' | 'withTrailingIcon'
> & {
  innerStyles?: IButtonBaseOwnProps['innerStyles'] & {
    circularProgressIndicator?: IZeroOrMore<
      ICompiledStyles<ICircularProgressIndicatorStyleKey>
    >;
  };
  variant?: IButtonVariant | false;
  icon?: React.ReactNode;
  trailingIcon?: boolean;
  loading?: boolean; // TODO: -> Button
  loadingAnimation?: 'progressIndicator' | 'halfSpin' | 'none'; // TODO: -> Button
  loadingText?: string; // TODO: -> Button
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => IMaybeAsync<IAny>; // TODO: -> ButtonBase
};

export type IButtonProps<
  TRoot extends React.ElementType = typeof BUTTON_DEFAULT_TAG,
> = IPolymorphicComponentPropsWithRef<TRoot, IButtonOwnProps>;
