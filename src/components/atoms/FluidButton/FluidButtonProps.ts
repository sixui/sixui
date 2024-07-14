import type {
  ICompiledStyles,
  IContainerProps,
  IZeroOrMore,
} from '@/helpers/types';
import type { IPolymorphicComponentPropsWithRef } from '@/helpers/react/polymorphicComponentTypes';
import { IFluidButtonStyleKey } from './FluidButton.styledefs';
import { IButtonBaseOwnProps, IButtonBaseStylesKey } from '../ButtonBase';

export const FLUID_BUTTON_DEFAULT_TAG = 'button';

export type IFluidButtonOwnProps = IContainerProps<IFluidButtonStyleKey> &
  IButtonBaseOwnProps & {
    innerStyles?: IButtonBaseOwnProps['innerStyles'] & {
      buttonBase?: IZeroOrMore<ICompiledStyles<IButtonBaseStylesKey>>;
    };
    children?: React.ReactNode;
  };

export type IFluidButtonProps<
  TRoot extends React.ElementType = typeof FLUID_BUTTON_DEFAULT_TAG,
> = IPolymorphicComponentPropsWithRef<TRoot, IFluidButtonOwnProps>;
