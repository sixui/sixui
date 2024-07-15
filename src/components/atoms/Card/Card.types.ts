import type {
  IContainerProps,
  IZeroOrMore,
  ICompiledStyles,
  IMaybeAsync,
  IAny,
} from '@/helpers/types';
import type { IPolymorphicComponentPropsWithRef } from '@/helpers/react/polymorphicComponentTypes';
import type { IElevationStylesKey } from '@/components/utils/Elevation';
import type { IStateLayerStylesKey } from '@/components/utils/StateLayer';
import type { IFocusRingStylesKey } from '@/components/utils/FocusRing';
import type { IVisualState } from '@/components/utils/VisualState';
import type { ICardStylesKey } from './Card.styles';

export type ICardVariant = 'elevated' | 'filled' | 'outlined';

export const CARD_DEFAULT_TAG = 'div';

export type ICardOwnProps = IContainerProps<ICardStylesKey> & {
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

export type ICardProps<
  TRoot extends React.ElementType = typeof CARD_DEFAULT_TAG,
> = IPolymorphicComponentPropsWithRef<TRoot, ICardOwnProps>;
