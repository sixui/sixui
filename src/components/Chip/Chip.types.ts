import type {
  IContainerProps,
  IZeroOrMore,
  ICompiledStyles,
  IAny,
  IMaybeAsync,
} from '@/helpers/types';
import type { IPolymorphicComponentPropsWithRef } from '@/helpers/react/polymorphicComponentTypes';
import type { IStateLayerStylesKey } from '@/components/StateLayer';
import type { IFocusRingStylesKey } from '@/components/FocusRing';
import type { IElevationStylesKey } from '@/components/Elevation';
import type { IVisualState } from '@/components/VisualState';
import type { ICircularProgressIndicatorStylesKey } from '@/components/CircularProgressIndicator';
import type { IChipStylesKey } from './Chip.styles';

export type IChipVariant = 'assist' | 'filter' | 'input' | 'suggestion';

export const CHIP_DEFAULT_TAG = 'div';

export type IChipOwnProps = IContainerProps<IChipStylesKey> & {
  innerStyles?: {
    stateLayer?: IZeroOrMore<ICompiledStyles<IStateLayerStylesKey>>;
    focusRing?: IZeroOrMore<ICompiledStyles<IFocusRingStylesKey>>;
    elevation?: IZeroOrMore<ICompiledStyles<IElevationStylesKey>>;
    trailingActionFocusRing?: IZeroOrMore<ICompiledStyles<IFocusRingStylesKey>>;
    trailingActionStateLayer?: IZeroOrMore<
      ICompiledStyles<IStateLayerStylesKey>
    >;
    circularProgressIndicator?: ICompiledStyles<ICircularProgressIndicatorStylesKey>;
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