import type {
  IContainerProps,
  IZeroOrMore,
  ICompiledStyles,
  IMaybeAsync,
  IAny,
} from '@/helpers/types';
import type { IPolymorphicComponentPropsWithRef } from '@/helpers/react/polymorphicComponentTypes';
import type { IElevationStyleKey } from '@/components/utils/Elevation';
import type { IStateLayerStyleKey } from '@/components/utils/StateLayer';
import type { IFocusRingStyleKey } from '@/components/utils/FocusRing';
import type { IVisualState } from '@/components/utils/VisualState';
import type { ICardStyleKey } from './Card.styles';

export type ICardVariant = 'elevated' | 'filled' | 'outlined';

export const CARD_DEFAULT_TAG = 'div';

export type ICardOwnProps = IContainerProps<ICardStyleKey> & {
  innerStyles?: {
    elevation?: IZeroOrMore<ICompiledStyles<IElevationStyleKey>>;
    stateLayer?: IZeroOrMore<ICompiledStyles<IStateLayerStyleKey>>;
    focusRing?: IZeroOrMore<ICompiledStyles<IFocusRingStyleKey>>;
  };
  visualState?: IVisualState;
  variant?: ICardVariant | false;
  children: React.ReactNode;
  onClick?: (event?: React.MouseEvent<HTMLElement>) => IMaybeAsync<IAny>;
  href?: string;
  disabled?: boolean;
};

export type ICardProps<
  TRoot extends React.ElementType = typeof CARD_DEFAULT_TAG,
> = IPolymorphicComponentPropsWithRef<TRoot, ICardOwnProps>;
