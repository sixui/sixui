import type { IContainerProps } from '@/helpers/types';
import type { IPlainTooltipContentStyleKey } from './PlainTooltipContent.styledefs';

export type IPlainTooltipContentProps =
  IContainerProps<IPlainTooltipContentStyleKey> & {
    supportingText: React.ReactNode;
    renderCursor?: (
      userProps?: React.HTMLAttributes<SVGSVGElement>,
    ) => React.ReactNode;
  };
