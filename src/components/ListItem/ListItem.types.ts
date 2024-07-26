import type {
  IContainerProps,
  IZeroOrMore,
  ICompiledStyles,
  IOmit,
} from '~/helpers/types';
import type { IPolymorphicComponentPropsWithRef } from '~/helpers/react/polymorphicComponentTypes';
import type { IItemProps, IItemStylesKey } from '~/components/Item';
import type { IStateLayerStylesKey } from '~/components/StateLayer';
import type { IFocusRingStylesKey } from '~/components/FocusRing';
import type { IVisualState } from '~/components/VisualState';
import type { IListItemStylesKey } from './ListItem.styles';

export const LIST_ITEM_DEFAULT_TAG = 'button';

export type IListItemVariant = 'standard' | 'danger';

export type IListItemOwnProps = IContainerProps<IListItemStylesKey> &
  IOmit<IItemProps, 'container'> & {
    innerStyles?: {
      item?: IZeroOrMore<ICompiledStyles<IItemStylesKey>>;
      stateLayer?: IZeroOrMore<ICompiledStyles<IStateLayerStylesKey>>;
      focusRing?: IZeroOrMore<ICompiledStyles<IFocusRingStylesKey>>;
    };
    variant?: IListItemVariant | false;
    visualState?: IVisualState;
    href?: string;
    target?: React.AnchorHTMLAttributes<HTMLAnchorElement>['target'];

    /**
     * Disables the item and makes it non-selectable and non-interactive.
     */
    disabled?: boolean;

    selected?: boolean;
    leading?: React.ReactNode;
    leadingIcon?: React.ReactNode;
    leadingImage?: string;
    leadingVideo?: Array<{ type: string; src: string }>;
    trailing?: React.ReactNode;
    trailingIcon?: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLElement>;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    noFocusRing?: boolean;
    maxLines?: number;
  };

export type IListItemProps<
  TRoot extends React.ElementType = typeof LIST_ITEM_DEFAULT_TAG,
> = IPolymorphicComponentPropsWithRef<TRoot, IListItemOwnProps>;
