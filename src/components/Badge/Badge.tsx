import { forwardRef, useMemo } from 'react';

import type { IBadgeProps } from './Badge.types';
import { stylesCombinatorFactory } from '~/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '~/helpers/stylePropsFactory';
import { useComponentTheme } from '~/hooks/useComponentTheme';
import { badgeStyles } from './Badge.styles';
import { badgeTheme } from './Badge.stylex';
import { isNumeric } from '~/helpers/isNumeric';

export const Badge = forwardRef<HTMLDivElement, IBadgeProps>(
  function Badge(props, forwardedRef) {
    const { styles, sx, value, maxValue, showZero, dot, ...other } = props;

    const componentTheme = useComponentTheme('Badge');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(badgeStyles, styles),
      [styles],
    );
    const sxf = useMemo(
      () => stylePropsFactory(stylesCombinator),
      [stylesCombinator],
    );

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
      <div
        {...sxf(
          badgeTheme,
          componentTheme.overridenStyles,
          'host',
          invisible && 'host$invisible',
          dot && 'host$dot',
          sx,
        )}
        ref={forwardedRef}
        {...other}
      >
        <div {...sxf('background')} />
        <div {...sxf('label')}>{displayValue}</div>
      </div>
    );
  },
);
