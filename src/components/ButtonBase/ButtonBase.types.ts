import type {
  IContainerProps,
  IZeroOrMore,
  ICompiledStyles,
} from '~/helpers/types';
import type { IPolymorphicComponentPropsWithRef } from '~/helpers/react/polymorphicComponentTypes';
import type { IStateLayerStylesKey } from '~/components/StateLayer';
import type { IFocusRingStylesKey } from '~/components/FocusRing';
import type { IElevationStylesKey } from '~/components/Elevation';
import type { IVisualState } from '~/components/VisualState';
import type { IButtonBaseStylesKey } from './ButtonBase.styles';

export const BUTTON_BASE_DEFAULT_TAG = 'button';

export type IButtonBaseOwnProps = IContainerProps<IButtonBaseStylesKey> & {
  innerStyles?: {
    stateLayer?: IZeroOrMore<ICompiledStyles<IStateLayerStylesKey>>;
    focusRing?: IZeroOrMore<ICompiledStyles<IFocusRingStylesKey>>;
    elevation?: IZeroOrMore<ICompiledStyles<IElevationStylesKey>>;
  };
  visualState?: IVisualState;
  children?: React.ReactNode;
  inwardFocusRing?: boolean;
  href?: string;
  target?: React.AnchorHTMLAttributes<HTMLAnchorElement>['target'];
  disabled?: boolean;

  /**
   * If `true`, the button will be rendered in a disabled state, but will still
   * be focusable.
   */
  softDisabled?: boolean;

  type?: string;
};

export type IButtonBaseProps<
  TRoot extends React.ElementType = typeof BUTTON_BASE_DEFAULT_TAG,
> = IPolymorphicComponentPropsWithRef<TRoot, IButtonBaseOwnProps>;
