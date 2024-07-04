import { forwardRef, useMemo } from 'react';

import type { IContainerProps } from '@/helpers/types';
import type { IBadgeStyleKey, IBadgeStyleVarKey } from './Badge.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';

export type IBadgeProps = IContainerProps<IBadgeStyleKey> & {
  children?: React.ReactNode;
  value?: number;
  maxValue?: number;
  showZero?: boolean;
  dot?: boolean;
  invisible?: boolean;
  disabled?: boolean;
};

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

    const { theme } = useComponentTheme('Badge');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(theme.styles, styles),
      [theme.styles, styles],
    );
    const sxf = useMemo(
      () =>
        stylePropsFactory<IBadgeStyleKey, IBadgeStyleVarKey>(stylesCombinator),
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
          'host',
          invisible && 'host$invisible',
          dot && 'host$dot',
          theme.vars,
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
