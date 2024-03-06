import { forwardRef, useMemo } from 'react';

import type { IContainerProps } from '@/helpers/types';
import type { IBadgeStyleKey, IBadgeStyleVarKey } from './Badge.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';

export type IBadgeProps = IContainerProps<IBadgeStyleKey> & {
  value?: number;
  maxValue?: number;
  showZero?: boolean;
  dot?: boolean;
  invisible?: boolean;
  disabled?: boolean;
};

export const Badge = forwardRef<HTMLDivElement, IBadgeProps>(
  function Badge(props, ref) {
    const {
      styles,
      sx,
      value,
      maxValue,
      showZero,
      dot,
      invisible: invisibleProp,
      disabled,
      ...other
    } = props;

    const theme = useComponentTheme('Badge');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(theme.styles, styles),
      [theme.styles, styles],
    );
    const styleProps = useMemo(
      () =>
        stylePropsFactory<IBadgeStyleKey, IBadgeStyleVarKey>(stylesCombinator),
      [stylesCombinator],
    );

    const invisible =
      invisibleProp ||
      (value === undefined && !dot) ||
      (value !== undefined && value <= 0 && !showZero);

    const displayValue = useMemo(
      () =>
        dot
          ? null
          : value !== undefined
            ? maxValue !== undefined && value > maxValue
              ? `${maxValue}+`
              : Math.max(0, value)
            : null,
      [dot, value, maxValue],
    );

    return (
      <div
        {...styleProps(
          ['host', invisible && 'host$invisible', dot && 'host$dot', sx],
          [theme.vars],
        )}
        ref={ref}
        {...other}
      >
        <div
          {...styleProps(['background', disabled && 'background$disabled'])}
        />
        <div {...styleProps(['label', disabled && 'label$disabled'])}>
          {displayValue}
        </div>
      </div>
    );
  },
);
