import type {
  IContainerProps,
  IZeroOrMore,
  ICompiledStyles,
} from '@/helpers/types';
import type { IPolymorphicComponentPropsWithRef } from '@/helpers/react/polymorphicComponentTypes';
import type { IButtonBaseStyleKey } from './ButtonBase.styledefs';
import type { IStateLayerStyleKey } from '@/components/utils/StateLayer';
import type { IFocusRingStyleKey } from '@/components/utils/FocusRing';
import type { IElevationStyleKey } from '@/components/utils/Elevation';
import type { IVisualState } from '@/components/utils/VisualState';

export const BUTTON_BASE_DEFAULT_TAG = 'button';

export type IButtonBaseOwnProps = IContainerProps<IButtonBaseStyleKey> & {
  innerStyles?: {
    stateLayer?: IZeroOrMore<ICompiledStyles<IStateLayerStyleKey>>;
    focusRing?: IZeroOrMore<ICompiledStyles<IFocusRingStyleKey>>;
    elevation?: IZeroOrMore<ICompiledStyles<IElevationStyleKey>>;
  };
  visualState?: IVisualState;
  withLeadingIcon?: boolean; // TODO: -> Button
  withTrailingIcon?: boolean; // TODO: -> Button
  children?: React.ReactNode;
  inwardFocusRing?: boolean;
  href?: string;
  target?: React.AnchorHTMLAttributes<HTMLAnchorElement>['target'];
  disabled?: boolean;
  readOnly?: boolean;
  type?: string;
};

export type IButtonBaseProps<
  TRoot extends React.ElementType = typeof BUTTON_BASE_DEFAULT_TAG,
> = IPolymorphicComponentPropsWithRef<TRoot, IButtonBaseOwnProps>;
