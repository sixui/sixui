import { forwardRef, useMemo } from 'react';

import type { IBadgeProps } from './Badge.types';
import { isNumeric } from '~/helpers/isNumeric';
import { createPolymorphicComponent } from '~/helpers/react/polymorphicComponentTypes';
import { useStyles } from '~/hooks/useStyles';
import { Base } from '../Base';
import { badgeStyles } from './Badge.styles';
import { badgeTheme } from './Badge.stylex';

export const Badge = createPolymorphicComponent<'div', IBadgeProps>(
  forwardRef<HTMLDivElement, IBadgeProps>(function Badge(props, forwardedRef) {
    const { styles, sx, value, maxValue, showZero, dot, ...other } = props;

    const { combineStyles, getStyles, globalStyles } = useStyles({
      name: 'Badge',
      styles: [badgeStyles, styles],
    });

    const valueAsNumber = isNumeric(value) ? Number(value) : undefined;
    const invisible =
      (value === undefined && !dot) ||
      (valueAsNumber !== undefined && valueAsNumber <= 0 && !showZero);

    const displayValue = useMemo(
      () =>
        dot
          ? null
          : valueAsNumber !== undefined
            ? maxValue !== undefined && valueAsNumber > maxValue
              ? `${maxValue}+`
              : Math.max(0, valueAsNumber)
            : value,
      [dot, value, maxValue, valueAsNumber],
    );

    return (
      <Base
        {...other}
        sx={[
          badgeTheme,
          globalStyles,
          combineStyles(
            'host',
            invisible && 'host$invisible',
            dot && 'host$dot',
          ),
          sx,
        ]}
        ref={forwardedRef}
      >
        <div {...getStyles('background')} />
        <div {...getStyles('label')}>{displayValue}</div>
      </Base>
    );
  }),
);
