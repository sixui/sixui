import type {
  IContainerProps,
  IZeroOrMore,
  ICompiledStyles,
  IOmit,
} from '@/helpers/types';
import type { IPolymorphicComponentPropsWithRef } from '@/helpers/react/polymorphicComponentTypes';
import type {
  IButtonOwnProps,
  IButtonStyleKey,
} from '@/components/atoms/Button';
import type { IFabSize, IFabStyleKey, IFabVariant } from './Fab.styledefs';

export const FAB_DEFAULT_TAG = 'button';

export type IFabOwnProps = IOmit<
  IButtonOwnProps,
  'variant' | 'icon' | 'trailingIcon'
> &
  IContainerProps<IFabStyleKey> & {
    innerStyles?: IButtonOwnProps['innerStyles'] & {
      button?: IZeroOrMore<ICompiledStyles<IButtonStyleKey>>;
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
