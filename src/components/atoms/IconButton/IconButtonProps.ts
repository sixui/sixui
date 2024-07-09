import type { IContainerProps, IOmit } from '@/helpers/types';
import type { IPolymorphicComponentPropsWithRef } from '@/helpers/react/polymorphicComponentTypes';
import type { IButtonOwnProps } from '@/components/atoms/Button';
import type {
  IIconButtonStyleKey,
  IIconButtonVariant,
} from './IconButton.styledefs';

export const ICON_BUTTON_DEFAULT_TAG = 'button';

export type IIconButtonOwnProps = IOmit<
  IButtonOwnProps,
  'icon' | 'variant' | 'trailingIcon'
> &
  IContainerProps<IIconButtonStyleKey> &
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
