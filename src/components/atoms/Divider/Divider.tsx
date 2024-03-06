import { forwardRef, useMemo } from 'react';

import type { IContainerProps } from '@/helpers/types';
import type {
  IDividerStyleKey,
  IDividerStyleVarKey,
} from './Divider.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';

// https://github.com/material-components/material-web/blob/main/divider/internal/divider.ts

export type IDividerProps = IContainerProps<IDividerStyleKey> & {
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

export const Divider = forwardRef<HTMLDivElement, IDividerProps>(
  function Divider(props, ref) {
    const { styles, sx, inset, insetStart, insetEnd, ...other } = props;

    const theme = useComponentTheme('Divider');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(theme.styles, styles),
      [theme.styles, styles],
    );
    const styleProps = useMemo(
      () =>
        stylePropsFactory<IDividerStyleKey, IDividerStyleVarKey>(
          stylesCombinator,
        ),
      [stylesCombinator],
    );

    return (
      <div
        {...styleProps(
          [
            'host',
            inset && 'host$inset',
            insetStart && 'host$insetStart',
            insetEnd && 'host$insetEnd',
            sx,
          ],
          [theme.vars],
        )}
        ref={ref}
        {...other}
      />
    );
  },
);
