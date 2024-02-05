import React from 'react';

import type { IContainer } from '@/helpers/Container';
import type { IBadgeStyleKey, IBadgeStyleVarKey } from './Badge.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';

export interface IBadgeProps
  extends IContainer<IBadgeStyleKey, IBadgeStyleVarKey> {
  value?: number;
  maxValue?: number;
  showZero?: boolean;
  dot?: boolean;
  invisible?: boolean;
}

export const Badge: React.FC<IBadgeProps> = ({
  value,
  maxValue,
  showZero,
  dot,
  ...props
}) => {
  const theme = useComponentTheme('Badge');

  const styleProps = React.useMemo(
    () =>
      stylePropsFactory<IBadgeStyleKey, IBadgeStyleVarKey>(
        stylesCombinatorFactory(theme.styles, props.styles),
      ),
    [theme.styles, props.styles],
  );

  const invisible =
    props.invisible ||
    (value === undefined && !dot) ||
    (value !== undefined && value <= 0 && !showZero);

  const displayValue = React.useMemo(
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
        ['host', invisible && 'host$invisible', dot && 'host$dot'],
        [theme.vars, props.theme],
      )}
    >
      {displayValue}
    </div>
  );
};
