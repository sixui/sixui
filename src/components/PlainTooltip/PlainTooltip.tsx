import { forwardRef } from 'react';

import { PopoverBase, type IPopoverBaseProps } from '@/components/PopoverBase';
import type {
  IPlainTooltipForwardedProps,
  IPlainTooltipProps,
} from './PlainTooltip.types';
import { PlainTooltipContent } from '@/components/PlainTooltipContent';

export const PlainTooltip = forwardRef<HTMLDivElement, IPlainTooltipProps>(
  function PlainTooltip(props, forwardedRef) {
    const { ...other } = props;

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
      />
    );
  },
);
