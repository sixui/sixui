import type {
  IContainerProps,
  IZeroOrMore,
  ICompiledStyles,
} from '@/helpers/types';
import type { IElevationStyleKey } from '@/components/utils/Elevation';
import type { IRichTooltipContentStyleKey } from './RichTooltipContent.styledefs';

export type IRichTooltipContentActionsRenderProps = {
  onClose?: (event?: React.MouseEvent) => void;
};

export type IRichTooltipContentProps =
  IContainerProps<IRichTooltipContentStyleKey> & {
    innerStyles?: {
      elevation?: IZeroOrMore<ICompiledStyles<IElevationStyleKey>>;
    };
    subhead?: React.ReactNode;
    supportingText: React.ReactNode;
    actions?:
      | React.ReactNode
      | ((props: IRichTooltipContentActionsRenderProps) => React.ReactNode);
    renderCursor?: (
      userProps?: React.HTMLAttributes<SVGSVGElement>,
    ) => React.ReactNode;
    onClose?: (event?: React.MouseEvent) => void;
  };
