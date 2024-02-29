import { useMemo } from 'react';

import type { IContainerProps } from '@/components/utils/Container';
import type {
  IDividerStyleKey,
  IDividerStyleVarKey,
} from './Divider.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';

// https://github.com/material-components/material-web/blob/main/divider/internal/divider.ts

export type IDividerProps = IContainerProps<
  IDividerStyleKey,
  IDividerStyleVarKey
> & {
  /**
   * Indents the divider with equal padding on both sides.
   */
  inset?: boolean;

  /**
   * Indents the divider with padding on the leading side.
   */
  insetStart?: boolean;

  /**
   * Indents the divider with padding on the trailing side.
   */
  insetEnd?: boolean;
};

export const Divider: React.FC<IDividerProps> = ({
  inset,
  insetStart,
  insetEnd,
  ...props
}) => {
  const theme = useComponentTheme('Divider');

  const styleProps = useMemo(
    () =>
      stylePropsFactory<IDividerStyleKey, IDividerStyleVarKey>(
        stylesCombinatorFactory(theme.styles, props.styles),
        props.visualState,
      ),
    [theme.styles, props.styles, props.visualState],
  );

  return (
    <div
      {...styleProps(
        [
          'host',
          inset && 'host$inset',
          insetStart && 'host$insetStart',
          insetEnd && 'host$insetEnd',
          props.sx,
        ],
        [theme.vars, props.theme],
      )}
    />
  );
};
