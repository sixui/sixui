import { useMemo } from 'react';

import type { IBadgeFactory } from './Badge.types';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { useStyles } from '~/utils/styles/useStyles';
import { isNumeric } from '~/helpers/isNumeric';
import { Box } from '../Box';
import { badgeStyles, type IBadgeStylesFactory } from './Badge.css';

const COMPONENT_NAME = 'Badge';

export const Badge = polymorphicComponentFactory<IBadgeFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      style,
      value,
      maxValue,
      showZero,
      dot,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useStyles<IBadgeStylesFactory>({
      componentName: COMPONENT_NAME,
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
  },
);

Badge.styles = badgeStyles;
Badge.displayName = `@sixui/${COMPONENT_NAME}`;
