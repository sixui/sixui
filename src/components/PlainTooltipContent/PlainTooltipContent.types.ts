import type { IContainerProps } from '@/helpers/types';
import type { IPlainTooltipContentStylesKey } from './PlainTooltipContent.styles';

export type IPlainTooltipContentProps =
  IContainerProps<IPlainTooltipContentStylesKey> & {
    supportingText: React.ReactNode;
    renderCursor?: (
      userProps?: React.HTMLAttributes<SVGSVGElement>,
    ) => React.ReactNode;
  };
