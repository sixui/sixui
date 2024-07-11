import { forwardRef } from 'react';

import {
  TooltipBase,
  type ITooltipBaseProps,
} from '@/components/atoms/TooltipBase';
import type {
  IPlainTooltipForwardedProps,
  IPlainTooltipProps,
} from './PlainTooltipProps';
import { PlainTooltipContent } from '@/components/atoms/PlainTooltipContent';

export const PlainTooltip = forwardRef<HTMLDivElement, IPlainTooltipProps>(
  function PlainTooltip(props, forwardedRef) {
    const { ...other } = props;

    const renderContent: ITooltipBaseProps<IPlainTooltipForwardedProps>['contentRenderer'] =
      ({ renderCursor, forwardedProps }) => (
        <PlainTooltipContent
          {...forwardedProps!}
          ref={forwardedRef}
          renderCursor={renderCursor}
        />
      );

    return (
      <TooltipBase<IPlainTooltipForwardedProps>
        {...other}
        contentRenderer={renderContent}
        cursor='arrow'
        forwardProps
      />
    );
  },
);
