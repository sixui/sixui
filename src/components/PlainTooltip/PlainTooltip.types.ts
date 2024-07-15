import type { IOmit } from '@/helpers/types';
import type { ITooltipBaseProps } from '@/components/TooltipBase';
import type { IPlainTooltipContentProps } from '@/components/PlainTooltipContent';

export type IPlainTooltipInheritedProps = IOmit<
  ITooltipBaseProps,
  'contentRenderer' | 'persistent'
>;

export type IPlainTooltipForwardedProps = IOmit<
  IPlainTooltipContentProps,
  'renderCursor'
>;

export type IPlainTooltipProps = IPlainTooltipInheritedProps &
  IPlainTooltipForwardedProps;
