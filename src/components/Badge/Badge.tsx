import { forwardRef, useMemo } from 'react';

import type { IBadgeFactory, IBadgeProps } from './Badge.types';
import { polymorphicComponentFactory } from '~/utils/polymorphicComponentFactory';
import { useProps } from '~/hooks/useProps';
import { useStyles } from '~/hooks/useStyles2';
import { isNumeric } from '~/helpers/isNumeric';
import { Box } from '../Box';
import { badgeStyles, type IBadgeStylesFactory } from './Badge.css';

export const Badge = polymorphicComponentFactory<IBadgeFactory>(
  forwardRef<HTMLDivElement, IBadgeProps>(function Badge(props, forwardedRef) {
    const {
      classNames,
      className,
      style,
      value,
      maxValue,
      showZero,
      dot,
      ...other
    } = useProps({ componentName: 'Badge', props });

    const { getStyles } = useStyles<IBadgeStylesFactory>({
      componentName: 'Badge',
      classNames,
      className,
      styles: badgeStyles,
      style,
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

Badge.styles = badgeStyles;
Badge.displayName = '@sixui/Badge';
