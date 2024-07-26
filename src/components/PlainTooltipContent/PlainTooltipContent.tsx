import { forwardRef, useMemo } from 'react';

import type { IPlainTooltipContentProps } from './PlainTooltipContent.types';
import { stylesCombinatorFactory } from '~/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '~/helpers/stylePropsFactory';
import { useComponentTheme } from '~/hooks/useComponentTheme';
import { plainTooltipContentStyles } from './PlainTooltipContent.styles';
import { plainTooltipContentTheme } from './PlainTooltipContent.stylex';

export const PlainTooltipContent = forwardRef<
  HTMLDivElement,
  IPlainTooltipContentProps
>(function PlainTooltipContent(props, forwardedRef) {
  const { styles, sx, supportingText, renderCursor, ...other } = props;

  const componentTheme = useComponentTheme('PlainTooltipContent');
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(plainTooltipContentStyles, styles),
    [styles],
  );
  const sxf = useMemo(
    () => stylePropsFactory(stylesCombinator),
    [stylesCombinator],
  );

  return (
    <div
      {...sxf(
        plainTooltipContentTheme,
        componentTheme.overridenStyles,
        'host',
        sx,
      )}
      ref={forwardedRef}
      {...other}
    >
      {renderCursor ? renderCursor(sxf('cursor')) : null}
      <div {...sxf('supportingText')}>{supportingText}</div>
    </div>
  );
});
