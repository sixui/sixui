import { forwardRef, useMemo } from 'react';

import type { IBadgeProps } from './Badge.types';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { badgeStyles } from './Badge.styles';
import { badgeTheme } from './Badge.stylex';

export const Badge = forwardRef<HTMLDivElement, IBadgeProps>(
  function Badge(props, forwardedRef) {
    const {
      styles,
      sx,
      children,
      value,
      maxValue,
      showZero,
      dot,
      invisible: invisibleProp,
      disabled,
      ...other
    } = props;

    const componentTheme = useComponentTheme('Badge');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(badgeStyles, styles),
      [styles],
    );
    const sxf = useMemo(
      () => stylePropsFactory(stylesCombinator),
      [stylesCombinator],
    );

    const invisible =
      invisibleProp ||
      (value === undefined && children === undefined && !dot) ||
      (value !== undefined && value <= 0 && !showZero);

    const displayValue = useMemo(
      () =>
        dot
          ? null
          : value !== undefined
            ? maxValue !== undefined && value > maxValue
              ? `${maxValue}+`
              : Math.max(0, value)
            : children,
      [dot, value, maxValue, children],
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
        <div {...sxf('background', disabled && 'background$disabled')} />
        <div {...sxf('label', disabled && 'label$disabled')}>
          {displayValue}
        </div>
      </div>
    );
  },
);
