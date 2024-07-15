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
import type { IBadgeProps } from '@/components/Badge';
import type { ITabStylesKey } from './Tab.styles';

export const TAB_DEFAULT_TAG = 'button';

export type ITabVariant = 'primary' | 'secondary';

export type ITabOwnProps = IContainerProps<ITabStylesKey> & {
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

export type ITabProps<
  TRoot extends React.ElementType = typeof TAB_DEFAULT_TAG,
> = IPolymorphicComponentPropsWithRef<TRoot, ITabOwnProps>;
