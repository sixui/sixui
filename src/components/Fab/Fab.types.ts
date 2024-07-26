import type {
  IContainerProps,
  IZeroOrMore,
  ICompiledStyles,
  IOmit,
} from '~/helpers/types';
import type { IPolymorphicComponentPropsWithRef } from '~/helpers/react/polymorphicComponentTypes';
import type { IButtonOwnProps, IButtonStylesKey } from '~/components/Button';
import type { IFabStylesKey } from './Fab.styles';

export type IFabVariant =
  | 'surface'
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'branded';

export type IFabSize = 'sm' | 'md' | 'lg';

export const FAB_DEFAULT_TAG = 'button';

export type IFabOwnProps = IOmit<
  IButtonOwnProps,
  'variant' | 'icon' | 'trailingIcon'
> &
  IContainerProps<IFabStylesKey> & {
    innerStyles?: IButtonOwnProps['innerStyles'] & {
      button?: IZeroOrMore<ICompiledStyles<IButtonStylesKey>>;
    };
    children?: React.ReactNode;
    size?: IFabSize;
    variant?: IFabVariant | false;
    label?: string;
    lowered?: boolean;
  };

export type IFabProps<
  TRoot extends React.ElementType = typeof FAB_DEFAULT_TAG,
> = IPolymorphicComponentPropsWithRef<TRoot, IFabOwnProps>;
