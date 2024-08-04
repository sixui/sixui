import type { IBaseProps } from '~/components/Base';
import type {
  IZeroOrMore,
  ICompiledStyles,
  IMaybeAsync,
  IAny,
} from '~/helpers/types';
import type { IStateLayerStylesKey } from '~/components/StateLayer';
import type { IFocusRingStylesKey } from '~/components/FocusRing';
import type { IElevationStylesKey } from '~/components/Elevation';
import type { IVisualState } from '~/components/VisualState';
import type { IButtonBaseStylesKey } from './ButtonBase.styles';

export type IButtonBaseProps = IBaseProps<IButtonBaseStylesKey> & {
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
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => IMaybeAsync<IAny>;

  /**
   * If `true`, the component will be rendered in a disabled state, but will
   * still be focusable.
   */
  softDisabled?: boolean;

  type?: string;
};
