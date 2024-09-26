import { useMemo } from 'react';

import type { IBadgeThemeFactory } from './Badge.css';
import type { IBadgeFactory } from './Badge.types';
import { isNumeric } from '~/helpers/isNumeric';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Box } from '../Box';
import { badgeTheme } from './Badge.css';

const COMPONENT_NAME = 'Badge';

export const Badge = polymorphicComponentFactory<IBadgeFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      value,
      maxValue,
      showZero,
      dot,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<IBadgeThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      theme: badgeTheme,
      variant,
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
        {...getStyles([
          'root',
          invisible && 'root$invisible',
          dot && 'root$dot',
        ])}
        ref={forwardedRef}
        {...other}
      >
        <div {...getStyles('background')} />
        <div {...getStyles('label')}>{displayValue}</div>
      </Box>
    );
  },
);

Badge.theme = badgeTheme;
Badge.displayName = `@sixui/${COMPONENT_NAME}`;
