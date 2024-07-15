import { forwardRef } from 'react';

import type {
  IRichTooltipForwardedProps,
  IRichTooltipProps,
} from './RichTooltip.types';
import { TooltipBase, type ITooltipBaseProps } from '@/components/TooltipBase';
import { RichTooltipContent } from '@/components/RichTooltipContent';

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
        cursor='dot'
        {...other}
        placement={placement}
        contentRenderer={renderContent}
        forwardProps
      />
    );
  },
);