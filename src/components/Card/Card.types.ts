import type { IBaseProps } from '../Base';
import type {
  IZeroOrMore,
  ICompiledStyles,
  IMaybeAsync,
  IAny,
} from '~/helpers/types';
import type { IElevationStylesKey } from '../Elevation';
import type { IStateLayerStylesKey } from '../StateLayer';
import type { IFocusRingStylesKey } from '../FocusRing';
import type { IVisualState } from '../VisualState';
import type { ICardStylesKey } from './Card.styles';

export type ICardVariant = 'elevated' | 'filled' | 'outlined';

export type ICardProps = IBaseProps<ICardStylesKey> & {
  innerStyles?: {
    elevation?: IZeroOrMore<ICompiledStyles<IElevationStylesKey>>;
    stateLayer?: IZeroOrMore<ICompiledStyles<IStateLayerStylesKey>>;
    focusRing?: IZeroOrMore<ICompiledStyles<IFocusRingStylesKey>>;
  };
  visualState?: IVisualState;
  variant?: ICardVariant | false;
  children: React.ReactNode;
  onClick?: (event?: React.MouseEvent<HTMLElement>) => IMaybeAsync<IAny>;
  href?: string;
  disabled?: boolean;
};
