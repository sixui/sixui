import type { IBaseProps } from '~/components/Base';
import type { ICompiledStyles, IZeroOrMore } from '~/helpers/types';
import type { IStateLayerStylesKey } from '../StateLayer';
import type { IFocusRingStylesKey } from '../FocusRing';
import type { IVisualState } from '../VisualState';
import type { INavigationRailDestinationStylesKey } from './NavigationRailDestination.styles';

export type INavigationRailDestinationProps =
  IBaseProps<INavigationRailDestinationStylesKey> & {
    innerStyles?: {
      stateLayer?: IZeroOrMore<ICompiledStyles<IStateLayerStylesKey>>;
      focusRing?: IZeroOrMore<ICompiledStyles<IFocusRingStylesKey>>;
    };
    visualState?: IVisualState;
    children?: React.ReactNode;
    href?: string;
    target?: React.AnchorHTMLAttributes<HTMLAnchorElement>['target'];
    disabled?: boolean;
    icon: React.ReactNode;
    activeIcon?: React.ReactNode;
    label?: React.ReactNode;
    badge?: React.ReactNode;
    active?: boolean;
    onClick?: () => void;

    /**
     * If `true`, the component will be rendered in a disabled state, but will
     * still be focusable.
     */
    readOnly?: boolean;
  };
