import React from 'react';

import type { IContainer } from '@/helpers/Container';
import type {
  IElevationStyleKey,
  IElevationStyleVarKey,
} from './Elevation.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';

export interface IElevationProps
  extends IContainer<IElevationStyleKey, IElevationStyleVarKey> {
  level?: 0 | 1 | 2 | 3 | 4 | 5;
  disabled?: boolean;
}

export const Elevation: React.FC<IElevationProps> = ({
  level,
  disabled,
  ...props
}) => {
  const theme = useComponentTheme('Elevation');

  const styleProps = React.useMemo(
    () =>
      stylePropsFactory<IElevationStyleKey, IElevationStyleVarKey>(
        stylesCombinatorFactory(theme.styles, props.styles),
      ),
    [theme.styles, props.styles],
  );

  return (
    <div
      {...styleProps(
        [
          'host',
          level !== undefined && `host$level${level}`,
          disabled && 'host$disabled',
        ],
        [theme.vars, props.theme],
      )}
      aria-hidden
    />
  );
};
