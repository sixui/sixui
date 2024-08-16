import type { IOmit } from '~/helpers/types';
import type {
  IPopoverBaseProps,
  IPopoverBaseTriggerRendererProps,
} from '../PopoverBase';
import type { IPlainTooltipContentProps } from '../PlainTooltipContent';

export type IPlainTooltipInheritedProps = IOmit<
  IPopoverBaseProps,
  'contentRenderer'
>;

export type IPlainTooltipTriggerRenderProps = IOmit<
  IPopoverBaseTriggerRendererProps,
  'setRef' | 'getProps'
>;

export type IPlainTooltipForwardedProps = IOmit<
  IPlainTooltipContentProps,
  'renderCursor'
>;

export type IPlainTooltipProps = IOmit<
  IPlainTooltipInheritedProps,
  'children'
> &
  IPlainTooltipForwardedProps & {
    children:
      | ((props: IPlainTooltipTriggerRenderProps) => React.ReactNode)
      | React.ReactNode;
  };
