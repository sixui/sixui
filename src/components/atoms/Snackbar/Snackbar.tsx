import { forwardRef, useMemo } from 'react';

import type { IContainerProps } from '@/helpers/types';
import type {
  ISnackbarStyleKey,
  ISnackbarStyleVarKey,
} from './Snackbar.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import {
  SnackbarContent,
  type ISnackbarContentProps,
} from '@/components/atoms/SnackbarContent';

export type ISnackbarProps = IContainerProps<ISnackbarStyleKey> &
  Omit<ISnackbarContentProps, 'styles' | 'sx'> & {
    open?: boolean;
    horizontalOrigin?: 'left' | 'center';
    autoHideDuration?: number;
  };

export const Snackbar = forwardRef<HTMLDivElement, ISnackbarProps>(
  function Snackbar(props, ref) {
    const { styles, sx, open, horizontalOrigin, autoHideDuration, ...other } =
      props;

    const { theme } = useComponentTheme('Snackbar');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(theme.styles, styles),
      [theme.styles, styles],
    );
    const sxf = useMemo(
      () =>
        stylePropsFactory<ISnackbarStyleKey, ISnackbarStyleVarKey>(
          stylesCombinator,
        ),
      [stylesCombinator],
    );

    if (!open) {
      return null;
    }

    return (
      <div ref={ref}>
        <SnackbarContent {...other} />
      </div>
    );
  },
);
