import type {
  ICompiledStyles,
  IContainerProps,
  IOmit,
  IZeroOrMore,
} from '~/helpers/types';
import type { IPolymorphicComponentPropsWithRef } from '~/helpers/react/polymorphicComponentTypes';
import type {
  IButtonBaseOwnProps,
  IButtonBaseStylesKey,
} from '~/components/ButtonBase';
import type { IFluidButtonStylesKey } from './FluidButton.styles';

export const FLUID_BUTTON_DEFAULT_TAG = 'button';

export type IFluidButtonOwnProps = IContainerProps<IFluidButtonStylesKey> &
  IOmit<IButtonBaseOwnProps, 'styles'> & {
    innerStyles?: IButtonBaseOwnProps['innerStyles'] & {
      buttonBase?: IZeroOrMore<ICompiledStyles<IButtonBaseStylesKey>>;
    };
    children?: React.ReactNode;
  };

export type IFluidButtonProps<
  TRoot extends React.ElementType = typeof FLUID_BUTTON_DEFAULT_TAG,
> = IPolymorphicComponentPropsWithRef<TRoot, IFluidButtonOwnProps>;
