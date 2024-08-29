import { forwardRef, useMemo } from 'react';

import type { IBadgeProps } from './Badge.types';
import { isNumeric } from '~/helpers/isNumeric';
import { createPolymorphicComponent } from '~/helpers/react/polymorphicComponentTypes';
import { useStyles } from '~/hooks/useStyles2';
import { Box } from '../Box';
import { badgeTheme, badgeStyles } from './Badge.css';

export const Badge = createPolymorphicComponent<'div', IBadgeProps>(
  forwardRef<HTMLDivElement, IBadgeProps>(function Badge(props, forwardedRef) {
    const {
      className,
      styles,
      style,
      value,
      maxValue,
      showZero,
      dot,
      ...other
    } = props;

    const { getStyles } = useStyles({
      name: 'Badge',
      className,
      style,
      stylesList: [badgeStyles, styles],
      theme: badgeTheme,
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
      <Box
        {...other}
        {...getStyles([
          'root',
          invisible && 'root$invisible',
          dot && 'root$dot',
        ])}
        ref={forwardedRef}
      >
        <div {...getStyles('background')} />
        <div {...getStyles('label')}>{displayValue}</div>
      </Box>
    );
  }),
);
