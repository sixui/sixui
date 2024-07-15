import type { IOmit } from '@/helpers/types';
import type { ITooltipBaseProps } from '@/components/TooltipBase';
import type { IRichTooltipContentProps } from '@/components/RichTooltipContent';

export type IRichTooltipInheritedProps = IOmit<
  ITooltipBaseProps,
  'contentRenderer'
>;

export type IRichTooltipForwardedProps = IOmit<
  IRichTooltipContentProps,
  'renderCursor' | 'onClose'
>;

export type IRichTooltipProps = IRichTooltipInheritedProps &
  IRichTooltipForwardedProps;
