import type { IBaseProps } from '../Base';
import type { IZeroOrMore, ICompiledStyles, IOmit } from '~/helpers/types';
import type { IButtonProps, IButtonStylesKey } from '../Button';
import type { IFabStylesKey } from './Fab.styles';

export type IFabVariant =
  | 'surface'
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'branded';

export type IFabSize = 'sm' | 'md' | 'lg';

export type IFabProps = IOmit<
  IButtonProps,
  'variant' | 'icon' | 'trailingIcon'
> &
  IBaseProps<IFabStylesKey> & {
    innerStyles?: IButtonProps['innerStyles'] & {
      button?: IZeroOrMore<ICompiledStyles<IButtonStylesKey>>;
    };
    children?: React.ReactNode;
    size?: IFabSize;
    variant?: IFabVariant | false;
    label?: string;
    lowered?: boolean;
  };
