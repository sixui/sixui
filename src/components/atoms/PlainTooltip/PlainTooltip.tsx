import { forwardRef } from 'react';

import type { IOmit } from '@/helpers/types';
import {
  TooltipBase,
  type ITooltipBaseProps,
} from '@/components/atoms/TooltipBase';
import {
  PlainTooltipContent,
  type IPlainTooltipContentProps,
} from '@/components/atoms/PlainTooltipContent';

type IPlainTooltipInheritedProps = IOmit<
  ITooltipBaseProps,
  'contentRenderer' | 'persistent'
>;

type IPlainTooltipForwardedProps = IOmit<
  IPlainTooltipContentProps,
  'renderCursor'
>;

export type IPlainTooltipProps = IPlainTooltipInheritedProps &
  IPlainTooltipForwardedProps;

export const PlainTooltip = forwardRef<HTMLDivElement, IPlainTooltipProps>(
  function PlainTooltip(props, forwardedRef) {
    const { ...other } = props;

    const renderContent: ITooltipBaseProps<IPlainTooltipForwardedProps>['contentRenderer'] =
      ({ renderCursor, forwardedHtmlProps }) => (
        <PlainTooltipContent
          {...forwardedHtmlProps!}
          ref={forwardedRef}
          renderCursor={renderCursor}
        />
      );

    return (
      <TooltipBase<IPlainTooltipForwardedProps>
        {...other}
        contentRenderer={renderContent}
        cursor='arrow'
        forwardHtmlProps
      />
    );
  },
);
