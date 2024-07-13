import type {
  IContainerProps,
  IZeroOrMore,
  ICompiledStyles,
  IAny,
  IMaybeAsync,
} from '@/helpers/types';
import type { IPolymorphicComponentPropsWithRef } from '@/helpers/react/polymorphicComponentTypes';
import type { IStateLayerStyleKey } from '@/components/utils/StateLayer';
import type { IFocusRingStyleKey } from '@/components/utils/FocusRing';
import type { IElevationStyleKey } from '@/components/utils/Elevation';
import type { IVisualState } from '@/components/utils/VisualState';
import type { ICircularProgressIndicatorStyleKey } from '@/components/atoms/CircularProgressIndicator';
import type { IChipStyleKey } from './Chip.styles';

export type IChipVariant = 'assist' | 'filter' | 'input' | 'suggestion';

export const CHIP_DEFAULT_TAG = 'div';

export type IChipOwnProps = IContainerProps<IChipStyleKey> & {
  innerStyles?: {
    stateLayer?: IZeroOrMore<ICompiledStyles<IStateLayerStyleKey>>;
    focusRing?: IZeroOrMore<ICompiledStyles<IFocusRingStyleKey>>;
    elevation?: IZeroOrMore<ICompiledStyles<IElevationStyleKey>>;
    trailingActionFocusRing?: IZeroOrMore<ICompiledStyles<IFocusRingStyleKey>>;
    trailingActionStateLayer?: IZeroOrMore<
      ICompiledStyles<IStateLayerStyleKey>
    >;
    circularProgressIndicator?: ICompiledStyles<ICircularProgressIndicatorStyleKey>;
  };
  visualState?: IVisualState;
  onClick?: (event: React.MouseEvent<HTMLElement>) => IMaybeAsync<IAny>;
  onDelete?: (event: React.MouseEvent<HTMLElement>) => IMaybeAsync<IAny>;
  variant?: IChipVariant | false;
  label?: React.ReactNode;
  disabled?: boolean;
  elevated?: boolean;
  selected?: boolean;
  icon?: React.ReactNode;
  href?: string;
  imageUrl?: string;
  loading?: boolean;
  loadingText?: string;
  deleting?: boolean;
  avatar?: boolean;
  'aria-label-remove'?: React.AriaAttributes['aria-label'];
};

export type IChipProps<
  TRoot extends React.ElementType = typeof CHIP_DEFAULT_TAG,
> = IPolymorphicComponentPropsWithRef<TRoot, IChipOwnProps>;
