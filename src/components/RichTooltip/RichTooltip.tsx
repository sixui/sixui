import { forwardRef } from 'react';

import type {
  IRichTooltipForwardedProps,
  IRichTooltipProps,
} from './RichTooltip.types';
import { PopoverBase, type IPopoverBaseProps } from '@/components/PopoverBase';
import { RichTooltipContent } from '@/components/RichTooltipContent';

export const RichTooltip = forwardRef<HTMLDivElement, IRichTooltipProps>(
  function RichTooltip(props, forwardedRef) {
    const { placement = 'bottom-end', persistent, ...other } = props;

    const renderContent: IPopoverBaseProps<IRichTooltipForwardedProps>['contentRenderer'] =
      ({ renderCursor, forwardedProps, close: onClose }) => (
        <RichTooltipContent
          {...forwardedProps!}
          ref={forwardedRef}
          renderCursor={renderCursor}
          onClose={onClose}
        />
      );

    return (
      <PopoverBase<IRichTooltipForwardedProps>
        cursor='dot'
        {...other}
        role='tooltip'
        placement={placement}
        contentRenderer={renderContent}
        forwardProps
        openOnHover={!persistent}
        openOnFocus={!persistent}
        nonDismissable={persistent}
      />
    );
  },
);
