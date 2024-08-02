import { forwardRef } from 'react';

import type { IPaperProps } from './Paper.types';
import { PaperBase } from '~/components/PaperBase';
import { getContainerTextColor, paperDynamicStyles } from './Paper.styles';
import { commonStyles } from '~/helpers/commonStyles';

// https://github.com/material-components/material-web/blob/main/labs/paper/internal/paper.ts

export const Paper = forwardRef<HTMLDivElement, IPaperProps>(
  function Paper(props, forwardedRef) {
    const {
      sx,
      innerStyles,
      children,
      elevation: elevationProp,
      corner,
      surface: surfaceProp = 'surfaceContainer',
      outlined,
      fill,
      expand,
      ...other
    } = props;

    const elevation = outlined ? 0 : elevationProp;
    const surface = outlined ? undefined : surfaceProp;
    const topLeftCorner = typeof corner === 'string' ? corner : corner?.topLeft;
    const topRightCorner =
      typeof corner === 'string' ? corner : corner?.topRight;
    const bottomRightCorner =
      typeof corner === 'string' ? corner : corner?.bottomRight;
    const bottomLeftCorner =
      typeof corner === 'string' ? corner : corner?.bottomLeft;
    const textColor = getContainerTextColor(surface);

    return (
      <PaperBase
        sx={[
          fill && commonStyles.fill,
          expand && commonStyles.expand,
          surface && paperDynamicStyles.surfaceColor(surface),
          !!elevation && paperDynamicStyles.containerElevation(elevation),
          topLeftCorner &&
            paperDynamicStyles.containerShape$topLeft(topLeftCorner),
          topRightCorner &&
            paperDynamicStyles.containerShape$topRight(topRightCorner),
          bottomRightCorner &&
            paperDynamicStyles.containerShape$bottomRight(bottomRightCorner),
          bottomLeftCorner &&
            paperDynamicStyles.containerShape$bottomLeft(bottomLeftCorner),
          paperDynamicStyles.textColor(textColor),
          paperDynamicStyles.outlineStyle(outlined ? 'solid' : 'none'),
          sx,
        ]}
        styles={innerStyles?.paperBase}
        innerStyles={innerStyles}
        ref={forwardedRef}
        {...other}
      >
        {children}
      </PaperBase>
    );
  },
);
