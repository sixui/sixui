import type { IOmit } from '~/helpers/types';
import type { IPopoverBaseProps } from '~/components/PopoverBase';
import type { IRichTooltipContentProps } from '~/components/RichTooltipContent';

export type IRichTooltipInheritedProps = IOmit<
  IPopoverBaseProps,
  'contentRenderer'
>;

export type IRichTooltipForwardedProps = IOmit<
  IRichTooltipContentProps,
  'renderCursor' | 'onClose'
>;

export type IRichTooltipProps = IRichTooltipInheritedProps &
  IRichTooltipForwardedProps & {
    persistent?: boolean;
  };
