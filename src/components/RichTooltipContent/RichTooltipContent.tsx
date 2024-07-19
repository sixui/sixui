import { forwardRef, useMemo } from 'react';
import { asArray } from '@olivierpascal/helpers';
import { isFunction } from '@/helpers/isFunction';

import type { IRichTooltipContentProps } from './RichTooltipContent.types';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { Elevation } from '@/components/Elevation';
import {
  richTooltipContentElevationStyles,
  richTooltipContentStyles,
} from './RichTooltipContent.styles';
import { richTooltipContentTheme } from './RichTooltipContent.stylex';

export const RichTooltipContent = forwardRef<
  HTMLDivElement,
  IRichTooltipContentProps
>(function RichTooltipContent(props, forwardedRef) {
  const {
    styles,
    sx,
    innerStyles,
    subhead,
    supportingText,
    actions,
    renderCursor,
    onClose,
    ...other
  } = props;

  const componentTheme = useComponentTheme('RichTooltipContent');
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(richTooltipContentStyles, styles),
    [styles],
  );
  const sxf = useMemo(
    () => stylePropsFactory(stylesCombinator),
    [stylesCombinator],
  );

  return (
    <div
      {...sxf(
        richTooltipContentTheme,
        componentTheme.overridenStyles,
        'host',
        sx,
      )}
      ref={forwardedRef}
      {...other}
    >
      <Elevation
        styles={[
          richTooltipContentElevationStyles,
          ...asArray(innerStyles?.elevation),
        ]}
      />
      {renderCursor ? renderCursor(sxf('cursor')) : null}
      <div {...sxf('content')}>
        {subhead ? <div {...sxf('subhead')}>{subhead}</div> : null}
        {supportingText ? (
          <div {...sxf('supportingText')}>{supportingText}</div>
        ) : null}
      </div>
      {actions ? (
        <div {...sxf('actions')}>
          {isFunction(actions) ? actions({ onClose }) : actions}
        </div>
      ) : null}
    </div>
  );
});
