import type {
  IAny,
  ICompiledStyles,
  IMaybeAsync,
  IZeroOrMore,
} from '~/helpers/types';
import type { IBadgeProps } from '../Badge';
import type { IBaseProps } from '../Base';
import type { IElevationStylesKey } from '../Elevation';
import type { IFocusRingStylesKey } from '../FocusRing';
import type { IStateLayerStylesKey } from '../StateLayer';
import type { IVisualState } from '../VisualState';
import type { ITabStylesKey } from './Tab.styles';

export type ITabVariant = 'primary' | 'secondary';

export type ITabProps = IBaseProps<ITabStylesKey> & {
  innerStyles?: {
    stateLayer?: IZeroOrMore<ICompiledStyles<IStateLayerStylesKey>>;
    focusRing?: IZeroOrMore<ICompiledStyles<IFocusRingStylesKey>>;
    elevation?: IZeroOrMore<ICompiledStyles<IElevationStylesKey>>;
  };
  visualState?: IVisualState;
  variant?: ITabVariant | false;

  /**
   * Whether or not the tab is selected.
   **/
  active?: boolean;

  icon?: React.ReactNode;
  activeIcon?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement>) => IMaybeAsync<IAny>;
  label?: string;
  href?: string;
  anchor?: string;
  disabled?: boolean;
  badge?: IBadgeProps;
};
