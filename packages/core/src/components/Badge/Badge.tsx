import { useMemo } from 'react';

import type { IBadgeThemeFactory } from './Badge.css';
import type { IBadgeFactory } from './Badge.types';
import { Paper } from '~/components/Paper';
import { useComponentTheme, useProps } from '~/components/ThemeProvider';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { isNumeric } from '~/utils/isNumeric';
import { COMPONENT_NAME } from './Badge.constants';
import { badgeTheme } from './Badge.css';

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
      variant,
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
      <Paper
        {...getStyles([
          'root',
          invisible && 'root$invisible',
          dot && 'root$dot',
        ])}
        ref={forwardedRef}
        {...other}
      >
        <div {...getStyles('label')}>{displayValue}</div>
      </Paper>
    );
  },
);

Badge.theme = badgeTheme;
Badge.displayName = `@sixui/${COMPONENT_NAME}`;
