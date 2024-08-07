import type { IZeroOrMore, ICompiledStyles } from '~/helpers/types';
import type { IBaseProps } from '../Base';
import type { IElevationStylesKey } from '../Elevation';
import type { IRichTooltipContentStylesKey } from './RichTooltipContent.styles';

export type IRichTooltipContentActionsRenderProps = {
  onClose?: (event?: React.MouseEvent) => void;
};

export type IRichTooltipContentProps =
  IBaseProps<IRichTooltipContentStylesKey> & {
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
