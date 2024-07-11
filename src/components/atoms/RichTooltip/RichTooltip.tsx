import { forwardRef } from 'react';

import type {
  IRichTooltipForwardedProps,
  IRichTooltipProps,
} from './RichTooltipProps';
import {
  TooltipBase,
  type ITooltipBaseProps,
} from '@/components/atoms/TooltipBase';
import { RichTooltipContent } from '@/components/atoms/RichTooltipContent';

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
