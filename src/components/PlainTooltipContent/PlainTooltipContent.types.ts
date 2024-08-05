import type { IBaseProps } from '../Base';
import type { IPlainTooltipContentStylesKey } from './PlainTooltipContent.styles';

export type IPlainTooltipContentProps =
  IBaseProps<IPlainTooltipContentStylesKey> & {
    supportingText: React.ReactNode;
    renderCursor?: (
      userProps?: React.HTMLAttributes<SVGSVGElement>,
    ) => React.ReactNode;
  };
