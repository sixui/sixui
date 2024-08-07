import type { IBaseProps } from '../Base';
import type { IOmit } from '~/helpers/types';
import type { IButtonProps } from '../Button';
import type { IIconButtonStylesKey } from './IconButton.styles';

export type IIconButtonVariant =
  | 'standard'
  | 'filled'
  | 'filledTonal'
  | 'outlined'
  | 'danger'
  | 'snackbar';

export type IIconButtonProps = IOmit<
  IButtonProps,
  'icon' | 'variant' | 'trailingIcon' | 'loadingText'
> &
  IBaseProps<IIconButtonStylesKey> &
  Pick<React.AriaAttributes, 'aria-label'> & {
    variant?: IIconButtonVariant | false;
    toggle?: boolean;
    selected?: boolean;
    icon: React.ReactNode;
    selectedIcon?: React.ReactNode;
    'aria-label-selected'?: React.AriaAttributes['aria-label'];
  };
