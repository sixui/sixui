import type { IOmit } from '@/helpers/types';
import type { ITooltipBaseProps } from '@/components/atoms/TooltipBase';
import type { IPlainTooltipContentProps } from '@/components/atoms/PlainTooltipContent';

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
