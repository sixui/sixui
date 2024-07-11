import { forwardRef, useMemo } from 'react';
import { asArray } from '@olivierpascal/helpers';
import { isFunction } from 'lodash';

import type { IRichTooltipContentProps } from './RichTooltipContentProps';
import type {
  IRichTooltipContentStyleKey,
  IRichTooltipContentStyleVarKey,
} from './RichTooltipContent.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { Elevation } from '@/components/utils/Elevation';

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

  const { theme } = useComponentTheme('RichTooltipContent');
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(theme.styles, styles),
    [theme.styles, styles],
  );
  const sxf = useMemo(
    () =>
      stylePropsFactory<
        IRichTooltipContentStyleKey,
        IRichTooltipContentStyleVarKey
      >(stylesCombinator),
    [stylesCombinator],
  );

  return (
    <div {...sxf('host', theme.vars, sx)} ref={forwardedRef} {...other}>
      <Elevation
        styles={[theme.elevationStyles, ...asArray(innerStyles?.elevation)]}
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
