import type { IBoxProps } from '../Box';
import type {
  IZeroOrMore,
  ICompiledStyles,
  IMaybeAsync,
  IAny,
} from '~/helpers/types';
import type { IStateLayerStylesKey } from '../StateLayer';
import type { IFocusRingStylesKey } from '../FocusRing';
import type { IElevationStylesKey } from '../Elevation';
import type { IVisualState } from '../VisualState';

export type IButtonBaseProps = IBoxProps & {
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
  readOnly?: boolean;

  type?: string;
};
