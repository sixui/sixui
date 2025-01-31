import type { IBoxProps } from '~/components/Box';
import type { IFocusRingProps } from '~/components/FocusRing';
import type { IPaperOwnProps } from '~/components/Paper';
import type { IUseStateLayerResult } from '~/components/StateLayer';
import type { IComponentThemeProps } from '~/components/ThemeProvider';
import type { IInteractionsMergeStrategy } from '~/hooks/useInteractions';
import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IMaybeAsync, IOmit } from '~/utils/types';
import type {
  buttonBaseTheme,
  IButtonBaseThemeFactory,
} from './ButtonBase.css';

export interface IButtonBaseChildrenRendererPops {
  renderFocusRing: () => React.ReactNode;
  renderStateLayer: () => React.ReactNode;
  renderTouchTarget: () => React.ReactNode;
}

export interface IButtonBaseOwnProps extends IOmit<IPaperOwnProps, 'children'> {
  interactionsMergeStrategy?: IInteractionsMergeStrategy;
  children?:
    | React.ReactNode
    | ((props: IButtonBaseChildrenRendererPops) => React.ReactNode);
  noFocusRing?: boolean;
  focusRingProps?: IFocusRingProps;
  href?: string;
  target?: React.AnchorHTMLAttributes<HTMLAnchorElement>['target'];
  rel?: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent) => IMaybeAsync<unknown>;
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
    IComponentThemeProps<IButtonBaseThemeFactory>,
    IButtonBaseOwnProps {}

export type IButtonBaseFactory = IPolymorphicComponentFactory<{
  props: IButtonBaseProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
  theme: typeof buttonBaseTheme;
}>;
