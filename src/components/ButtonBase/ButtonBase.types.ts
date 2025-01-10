import type { IMaybeAsync } from '~/helpers/types';
import type { IInteractionsMergeStrategy } from '~/hooks/useInteractions';
import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { IFocusRingProps } from '../FocusRing';
import type { IPaperOwnProps } from '../Paper';
import type { IUseStateLayerResult } from '../StateLayer';
import type {
  buttonBaseTheme,
  IButtonBaseThemeFactory,
} from './ButtonBase.css';

export interface IButtonBaseOwnProps {
  interactionsMergeStrategy?: IInteractionsMergeStrategy;
  children?: React.ReactNode;
  noFocusRing?: boolean;
  focusRingProps?: IFocusRingProps;
  href?: string;
  target?: React.AnchorHTMLAttributes<HTMLAnchorElement>['target'];
  rel?: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<Element>) => IMaybeAsync<unknown>;
  touchTargetRenderer?: (() => React.ReactNode) | null;
  nonInteractive?: boolean;

  /**
   * If `true`, the component will be rendered in a disabled state, but will
   * still be focusable.
   */
  readOnly?: boolean;

  type?: string;
  stateLayer?: IUseStateLayerResult;
}

export interface IButtonBaseProps
  extends IBoxProps,
    IPaperOwnProps,
    IButtonBaseOwnProps,
    IComponentThemeProps<IButtonBaseThemeFactory> {}

export type IButtonBaseFactory = IPolymorphicComponentFactory<{
  props: IButtonBaseProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
  theme: typeof buttonBaseTheme;
}>;
