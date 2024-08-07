import type { IBaseProps } from '../Base';
import type { ICompiledStyles, IOmit, IZeroOrMore } from '~/helpers/types';
import type { IButtonBaseProps, IButtonBaseStylesKey } from '../ButtonBase';
import type { IColorTagStylesKey } from '../ColorTag';
import type { IColorButtonStylesKey } from './ColorButton.styles';

export type IColorButtonProps = IBaseProps<IColorButtonStylesKey> &
  IOmit<IButtonBaseProps, 'styles'> & {
    innerStyles?: IButtonBaseProps['innerStyles'] & {
      buttonBase?: IZeroOrMore<ICompiledStyles<IButtonBaseStylesKey>>;
      colorTag?: IZeroOrMore<ICompiledStyles<IColorTagStylesKey>>;
    };
    children?: React.ReactNode;
    selected?: boolean;
    backgroundColor?: string;
    foregroundColor?: string;
  };
