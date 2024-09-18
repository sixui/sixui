import type { ICompiledStyles, IOmit, IZeroOrMore } from '~/helpers/types';
import type { IBaseProps } from '../Base';
import type { IButtonBaseProps, IButtonBaseStylesKey } from '../ButtonBase';
import type { IFluidButtonStylesKey } from './FluidButton.styles';

export type IFluidButtonProps = IBaseProps<IFluidButtonStylesKey> &
  IOmit<IButtonBaseProps, 'styles'> & {
    innerStyles?: IButtonBaseProps['innerStyles'] & {
      buttonBase?: IZeroOrMore<ICompiledStyles<IButtonBaseStylesKey>>;
    };
    children?: React.ReactNode;
  };
