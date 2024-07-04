import { forwardRef } from 'react';

import type { IOmit } from '@/helpers/types';
import {
  TooltipBase,
  type ITooltipBaseProps,
} from '@/components/atoms/TooltipBase';
import {
  RichTooltipContent,
  type IRichTooltipContentProps,
} from '@/components/atoms/RichTooltipContent';

type IRichTooltipInheritedProps = IOmit<ITooltipBaseProps, 'contentRenderer'>;

type IRichTooltipForwardedProps = IOmit<
  IRichTooltipContentProps,
  'renderCursor' | 'onClose'
>;

export type IRichTooltipProps = IRichTooltipInheritedProps &
  IRichTooltipForwardedProps;

export const RichTooltip = forwardRef<HTMLDivElement, IRichTooltipProps>(
  function RichTooltip(props, forwardedRef) {
    const { placement = 'bottom-end', ...other } = props;

    const renderContent: ITooltipBaseProps<IRichTooltipForwardedProps>['contentRenderer'] =
      ({ renderCursor, forwardedProps, onClose }) => (
        <RichTooltipContent
          {...forwardedProps!}
          ref={forwardedRef}
          renderCursor={renderCursor}
          onClose={onClose}
        />
      );

    return (
      <TooltipBase<IRichTooltipForwardedProps>
        {...other}
        placement={placement}
        contentRenderer={renderContent}
        cursor='dot'
        forwardProps
      />
    );
  },
);
