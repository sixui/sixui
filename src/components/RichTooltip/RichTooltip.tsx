import { forwardRef } from 'react';

import type {
  IRichTooltipForwardedProps,
  IRichTooltipProps,
} from './RichTooltip.types';
import { PopoverBase, type IPopoverBaseProps } from '../PopoverBase';
import { RichTooltipContent } from '../RichTooltipContent';
import { isFunction } from '~/helpers/isFunction';

export const RichTooltip = forwardRef<HTMLDivElement, IRichTooltipProps>(
  function RichTooltip(props, forwardedRef) {
    const { children, placement = 'bottom-end', persistent, ...other } = props;

    const renderContent: IPopoverBaseProps<IRichTooltipForwardedProps>['contentRenderer'] =
      ({ renderCursor, forwardedProps, close }) => (
        <RichTooltipContent
          {...forwardedProps!}
          ref={forwardedRef}
          renderCursor={renderCursor}
          onClose={close}
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
        openEvents={{ hover: !persistent, focus: !persistent }}
        withScrim={persistent}
        closeEvents={{
          clickOutside: !persistent,
          focusOut: !persistent,
          escapeKey: false,
        }}
      >
        {(renderProps) => (
          <span
            style={{ display: 'inline-flex' }}
            {...renderProps.getProps()}
            ref={renderProps.setRef}
          >
            {isFunction(children) ? children(renderProps) : children}
          </span>
        )}
      </PopoverBase>
    );
  },
);
