import { forwardRef } from 'react';

import type { IPlainTooltipContentProps } from './PlainTooltipContent.types';
import { useStyles } from '~/hooks/useStyles';
import { Base } from '../Base';
import { plainTooltipContentStyles } from './PlainTooltipContent.styles';
import { plainTooltipContentTheme } from './PlainTooltipContent.stylex';

export const PlainTooltipContent = forwardRef<
  HTMLDivElement,
  IPlainTooltipContentProps
>(function PlainTooltipContent(props, forwardedRef) {
  const { styles, sx, supportingText, renderCursor, ...other } = props;

  const { combineStyles, getStyles, globalStyles } = useStyles({
    componentName: 'PlainTooltipContent',
    styles: [plainTooltipContentStyles, styles],
  });

  return (
    <Base
      {...other}
      sx={[
        plainTooltipContentTheme,
        globalStyles,
        ...combineStyles('host'),
        sx,
      ]}
      ref={forwardedRef}
    >
      {renderCursor ? renderCursor(getStyles('cursor')) : null}
      <div {...getStyles('supportingText')}>{supportingText}</div>
    </Base>
  );
});
