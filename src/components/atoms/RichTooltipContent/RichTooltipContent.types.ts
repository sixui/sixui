import type {
  IContainerProps,
  IZeroOrMore,
  ICompiledStyles,
} from '@/helpers/types';
import type { IElevationStylesKey } from '@/components/utils/Elevation';
import type { IRichTooltipContentStylesKey } from './RichTooltipContent.styles';

export type IRichTooltipContentActionsRenderProps = {
  onClose?: (event?: React.MouseEvent) => void;
};

export type IRichTooltipContentProps =
  IContainerProps<IRichTooltipContentStylesKey> & {
    innerStyles?: {
      elevation?: IZeroOrMore<ICompiledStyles<IElevationStylesKey>>;
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
