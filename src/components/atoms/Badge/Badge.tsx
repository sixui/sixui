import * as React from 'react';

import type { IContainerProps } from '@/components/utils/Container';
import type { IBadgeStyleKey, IBadgeStyleVarKey } from './Badge.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';

export type IBadgeProps = IContainerProps<IBadgeStyleKey, IBadgeStyleVarKey> & {
  value?: number;
  maxValue?: number;
  showZero?: boolean;
  dot?: boolean;
  invisible?: boolean;
  disabled?: boolean;
};

export const Badge: React.FC<IBadgeProps> = ({
  value,
  maxValue,
  showZero,
  dot,
  disabled,
  ...props
}) => {
  const theme = useComponentTheme('Badge');

  const styleProps = React.useMemo(
    () =>
      stylePropsFactory<IBadgeStyleKey, IBadgeStyleVarKey>(
        stylesCombinatorFactory(theme.styles, props.styles),
        props.visualState,
      ),
    [theme.styles, props.styles, props.visualState],
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
        ['host', invisible && 'host$invisible', dot && 'host$dot', props.sx],
        [theme.vars, props.theme],
      )}
    >
      <div {...styleProps(['background', disabled && 'background$disabled'])} />
      <div {...styleProps(['label', disabled && 'label$disabled'])}>
        {displayValue}
      </div>
    </div>
  );
};
