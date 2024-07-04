import { forwardRef } from 'react';

import type { IOmit } from '@/helpers/types';
import {
  PersistentTooltipBase,
  type IPersistentTooltipBaseProps,
} from '@/components/atoms/PersistentTooltipBase';
import {
  RichTooltipContent,
  type IRichTooltipContentProps,
} from '@/components/atoms/RichTooltipContent';

type IPersistentRichTooltipInheritedProps = IOmit<
  IPersistentTooltipBaseProps,
  'contentRenderer'
>;

type IPersistentRichTooltipForwardedProps = IOmit<
  IRichTooltipContentProps,
  'renderCursor' | 'onClose'
>;

export type IPersistentRichTooltipProps = IPersistentRichTooltipInheritedProps &
  IPersistentRichTooltipForwardedProps;

export const PersistentRichTooltip = forwardRef<
  HTMLDivElement,
  IPersistentRichTooltipProps
>(function RichTooltip(props, forwardedRef) {
  const { placement = 'bottom-end', ...other } = props;

  const renderContent: IPersistentTooltipBaseProps<IPersistentRichTooltipForwardedProps>['contentRenderer'] =
    ({ renderCursor, onClose, forwardedHtmlProps }) => (
      <RichTooltipContent
        {...forwardedHtmlProps!}
        ref={forwardedRef}
        renderCursor={renderCursor}
        onClose={onClose}
      />
    );

  return (
    <PersistentTooltipBase<IPersistentRichTooltipForwardedProps>
      {...other}
      placement={placement}
      contentRenderer={renderContent}
      cursor='dot'
      forwardHtmlProps
    />
  );
});
