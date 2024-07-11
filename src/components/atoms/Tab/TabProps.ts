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
import type { IBadgeProps } from '@/components/atoms/Badge';
import type { ITabStyleKey, ITabVariant } from './Tab.styledefs';

export const TAB_DEFAULT_TAG = 'button';

export type ITabOwnProps = IContainerProps<ITabStyleKey> & {
  innerStyles?: {
    stateLayer?: IZeroOrMore<ICompiledStyles<IStateLayerStyleKey>>;
    focusRing?: IZeroOrMore<ICompiledStyles<IFocusRingStyleKey>>;
    elevation?: IZeroOrMore<ICompiledStyles<IElevationStyleKey>>;
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

export type ITabProps<
  TRoot extends React.ElementType = typeof TAB_DEFAULT_TAG,
> = IPolymorphicComponentPropsWithRef<TRoot, ITabOwnProps>;
