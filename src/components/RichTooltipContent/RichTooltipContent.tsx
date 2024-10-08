import { forwardRef } from 'react';
import { asArray } from '@olivierpascal/helpers';
import { isFunction } from '~/helpers/isFunction';

import type { IRichTooltipContentProps } from './RichTooltipContent.types';
import { useStyles } from '~/hooks/useStyles';
import { Base } from '../Base';
import { Elevation } from '../Elevation';
import {
  richTooltipContentElevationStyles,
  richTooltipContentStyles,
} from './RichTooltipContent.styles';
import { richTooltipContentTheme } from './RichTooltipContent.stylex';
import { Stack } from '../Stack';

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

  const { combineStyles, getStyles, globalStyles } = useStyles({
    name: 'RichTooltipContent',
    styles: [richTooltipContentStyles, styles],
  });

  return (
    <Base
      {...other}
      sx={[richTooltipContentTheme, globalStyles, ...combineStyles('host'), sx]}
      ref={forwardedRef}
    >
      <Elevation
        styles={[
          richTooltipContentElevationStyles,
          ...asArray(innerStyles?.elevation),
        ]}
      />
      {renderCursor ? renderCursor(getStyles('cursor')) : null}
      <Stack gap={2} sx={combineStyles('content')}>
        {subhead ? <div {...getStyles('subhead')}>{subhead}</div> : null}
        {supportingText ? (
          <div {...getStyles('supportingText')}>{supportingText}</div>
        ) : null}
      </Stack>
      {actions ? (
        <Stack horizontal gap={2} wrap sx={combineStyles('actions')}>
          {isFunction(actions) ? actions({ onClose }) : actions}
        </Stack>
      ) : null}
    </Base>
  );
});
