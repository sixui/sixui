import { forwardRef } from 'react';

import type {
  IRichTooltipForwardedProps,
  IRichTooltipProps,
} from './RichTooltip.types';
import { PopoverBase, type IPopoverBaseProps } from '@/components/PopoverBase';
import { RichTooltipContent } from '@/components/RichTooltipContent';
import { isFunction } from '@/helpers/isFunction';

export const RichTooltip = forwardRef<HTMLDivElement, IRichTooltipProps>(
  function RichTooltip(props, forwardedRef) {
    const { children, placement = 'bottom-end', persistent, ...other } = props;

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
      >
        {(renderProps) => (
          <span {...renderProps.getProps()} ref={renderProps.setRef}>
            {isFunction(children) ? children(renderProps) : children}
          </span>
        )}
      </PopoverBase>
    );
  },
);
