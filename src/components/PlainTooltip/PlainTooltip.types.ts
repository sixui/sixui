import type { IOmit } from '~/helpers/types';
import type { IPopoverBaseProps } from '../PopoverBase';
import type { IPlainTooltipContentProps } from '../PlainTooltipContent';

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
