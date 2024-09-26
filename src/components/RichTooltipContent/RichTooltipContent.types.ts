import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type {
  IRichTooltipContentThemeFactory,
  richTooltipContentTheme,
} from './RichTooltipContent.css';

export type IRichTooltipContentActionsRenderProps = {
  onClose?: (event?: React.MouseEvent) => void;
};

export type IRichTooltipContentOwnProps = {
  subhead?: React.ReactNode;
  supportingText: React.ReactNode;
  actions?:
    | React.ReactNode
    | ((props: IRichTooltipContentActionsRenderProps) => React.ReactNode);
  renderCursor?: (
    userProps?: React.HTMLAttributes<SVGSVGElement>,
  ) => React.ReactNode;
  onClose?: () => void;
};

export interface IRichTooltipContentProps
  extends IBoxProps,
    IComponentThemeProps<IRichTooltipContentThemeFactory>,
    IRichTooltipContentOwnProps {}

export type IRichTooltipContentFactory = IComponentFactory<{
  props: IRichTooltipContentProps;
  ref: HTMLDivElement;
  theme: typeof richTooltipContentTheme;
}>;
