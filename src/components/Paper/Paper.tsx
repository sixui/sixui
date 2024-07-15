import { forwardRef, useMemo } from 'react';
import { asArray } from '@olivierpascal/helpers';

import type { IPaperProps } from './Paper.types';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { Elevation } from '@/components/Elevation';
import { paperVariantStyles } from './variants';
import { paperElevationStyles, paperStyles } from './Paper.styles';
import { paperTheme } from './Paper.stylex';

// https://github.com/material-components/material-web/blob/main/labs/paper/internal/paper.ts

export const Paper = forwardRef<HTMLDivElement, IPaperProps>(
  function Paper(props, forwardedRef) {
    const {
      styles,
      sx,
      variant = 'filled',
      innerStyles,
      children,
      elevation: elevationProp,
      square,
      ...other
    } = props;

    const { overridenStyles } = useComponentTheme('Paper');
    const variantStyles = variant ? paperVariantStyles[variant] : undefined;

    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(paperStyles, variantStyles, styles),
      [variantStyles, styles],
    );
    const sxf = useMemo(
      () => stylePropsFactory(stylesCombinator),
      [stylesCombinator],
    );

    const elevation = variant === 'outlined' ? 0 : (elevationProp ?? 0);

    return (
      <div
        {...sxf(
          paperTheme,
          overridenStyles,
          'host',
          `host$elevation${elevation}`,
          square && 'host$square',
          sx,
        )}
        ref={forwardedRef}
        {...other}
      >
        <Elevation
          styles={[paperElevationStyles, ...asArray(innerStyles?.elevation)]}
        />
        <div {...sxf('outline')} />
        <div {...sxf('background')} />
        <div {...sxf('content')}>{children}</div>
      </div>
    );
  },
);
