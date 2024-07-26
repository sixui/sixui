import { forwardRef } from 'react';

import { PopoverBase, type IPopoverBaseProps } from '~/components/PopoverBase';
import type {
  IPlainTooltipForwardedProps,
  IPlainTooltipProps,
} from './PlainTooltip.types';
import { PlainTooltipContent } from '~/components/PlainTooltipContent';
import { isFunction } from '~/helpers/isFunction';

export const PlainTooltip = forwardRef<HTMLDivElement, IPlainTooltipProps>(
  function PlainTooltip(props, forwardedRef) {
    const { children, ...other } = props;

    const renderContent: IPopoverBaseProps<IPlainTooltipForwardedProps>['contentRenderer'] =
      ({ renderCursor, forwardedProps }) => (
        <PlainTooltipContent
          {...forwardedProps!}
          ref={forwardedRef}
          renderCursor={renderCursor}
        />
      );

    return (
      <PopoverBase<IPlainTooltipForwardedProps>
        {...other}
        role='tooltip'
        contentRenderer={renderContent}
        cursor='arrow'
        forwardProps
        openOnHover
        openOnFocus
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
