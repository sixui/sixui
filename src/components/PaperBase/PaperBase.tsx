import { forwardRef, useMemo } from 'react';
import { asArray } from '@olivierpascal/helpers';

import type { IPaperBaseProps } from './PaperBase.types';
import { stylesCombinatorFactory } from '~/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '~/helpers/stylePropsFactory';
import { useComponentTheme } from '~/hooks/useComponentTheme';
import { Elevation } from '~/components/Elevation';
import { paperBaseElevationStyles, paperBaseStyles } from './PaperBase.styles';
import { paperBaseTheme } from './PaperBase.stylex';

// https://github.com/material-components/material-web/blob/main/labs/paperBase/internal/paperBase.ts

export const PaperBase = forwardRef<HTMLDivElement, IPaperBaseProps>(
  function PaperBase(props, forwardedRef) {
    const { styles, sx, innerStyles, children, ...other } = props;

    const componentTheme = useComponentTheme('PaperBase');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(paperBaseStyles, styles),
      [styles],
    );
    const sxf = useMemo(
      () => stylePropsFactory(stylesCombinator),
      [stylesCombinator],
    );

    return (
      <div
        {...sxf(paperBaseTheme, componentTheme.overridenStyles, 'host', sx)}
        ref={forwardedRef}
        {...other}
      >
        <Elevation
          styles={[
            paperBaseElevationStyles,
            ...asArray(innerStyles?.elevation),
          ]}
        />
        <div {...sxf('outline')} />
        <div {...sxf('background')} />
        {children}
      </div>
    );
  },
);
