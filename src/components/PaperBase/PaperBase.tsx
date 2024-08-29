import { forwardRef } from 'react';
import { asArray } from '@olivierpascal/helpers';

import type { IPaperBaseProps } from './PaperBase.types';
import { createPolymorphicComponent } from '~/helpers/react/polymorphicComponentTypes';
import { useStyles } from '~/hooks/useStyles';
import { Elevation } from '../Elevation';
import { paperBaseElevationStyles, paperBaseStyles } from './PaperBase.styles';
import { paperBaseTheme } from './PaperBase.stylex';
import { Base } from '../Base';

// https://github.com/material-components/material-web/blob/main/labs/paperBase/internal/paperBase.ts

export const PaperBase = createPolymorphicComponent<'div', IPaperBaseProps>(
  forwardRef<HTMLDivElement, IPaperBaseProps>(
    function PaperBase(props, forwardedRef) {
      const { styles, sx, innerStyles, children, ...other } = props;

      const { combineStyles, getStyles, globalStyles } = useStyles({
        componentName: 'PaperBase',
        styles: [paperBaseStyles, styles],
      });

      return (
        <Base
          {...other}
          sx={[paperBaseTheme, globalStyles, combineStyles('host'), sx]}
          ref={forwardedRef}
        >
          <Elevation
            styles={[
              paperBaseElevationStyles,
              ...asArray(innerStyles?.elevation),
            ]}
          />
          <div {...getStyles('outline')} />
          <div {...getStyles('background')} />
          {children}
        </Base>
      );
    },
  ),
);
