import type { IZeroOrMore, ICompiledStyles, IOmit } from '~/helpers/types';
import type { IBaseProps } from '../Base';
import type { IItemProps, IItemStylesKey } from '../Item';
import type { IStateLayerStylesKey } from '../StateLayer';
import type { IFocusRingStylesKey } from '../FocusRing';
import type { IVisualState } from '../VisualState';
import type { IListItemStylesKey } from './ListItem.styles';

export type IListItemVariant = 'standard' | 'danger';

export type IListItemProps = IBaseProps<IListItemStylesKey> &
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
