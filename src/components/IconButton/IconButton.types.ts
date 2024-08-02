import type { IContainerProps, IOmit } from '~/helpers/types';
import type { IPolymorphicComponentPropsWithRef } from '~/helpers/react/polymorphicComponentTypes';
import type { IButtonOwnProps } from '~/components/Button';
import type { IIconButtonStylesKey } from './IconButton.styles';

export const ICON_BUTTON_DEFAULT_TAG = 'button';

export type IIconButtonVariant =
  | 'standard'
  | 'filled'
  | 'filledTonal'
  | 'outlined'
  | 'danger'
  | 'snackbar';

export type IIconButtonOwnProps = IOmit<
  IButtonOwnProps,
  'icon' | 'variant' | 'trailingIcon' | 'loadingText'
> &
  IContainerProps<IIconButtonStylesKey> &
  Pick<React.AriaAttributes, 'aria-label'> & {
    variant?: IIconButtonVariant | false;
    toggle?: boolean;
    selected?: boolean;
    icon: React.ReactNode;
    selectedIcon?: React.ReactNode;
    'aria-label-selected'?: React.AriaAttributes['aria-label'];
  };

export type IIconButtonProps<
  TRoot extends React.ElementType = typeof ICON_BUTTON_DEFAULT_TAG,
> = IPolymorphicComponentPropsWithRef<TRoot, IIconButtonOwnProps>;
