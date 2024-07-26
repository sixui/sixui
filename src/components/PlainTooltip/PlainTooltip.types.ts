import type { IOmit } from '~/helpers/types';
import type { IPopoverBaseProps } from '~/components/PopoverBase';
import type { IPlainTooltipContentProps } from '~/components/PlainTooltipContent';

export type IPlainTooltipInheritedProps = IOmit<
  IPopoverBaseProps,
  'contentRenderer'
>;

export type IPlainTooltipForwardedProps = IOmit<
  IPlainTooltipContentProps,
  'renderCursor'
>;

export type IPlainTooltipProps = IPlainTooltipInheritedProps &
  IPlainTooltipForwardedProps;
