import stylex from '@stylexjs/stylex';
import { forwardRef, useMemo, useRef } from 'react';

import type { IContainerProps, IRange } from '@/helpers/types';
import type {
  ISkeletonStyleKey,
  ISkeletonStyleVarKey,
} from './Skeleton.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { randomInRange } from '@/helpers/randomInRange';
import { useComponentTheme } from '@/hooks/useComponentTheme';

export type ISkeletonProps = IContainerProps<ISkeletonStyleKey> & {
  children?: React.ReactNode;
  loading?: boolean;
  variant?: 'rectangular' | 'circular' | 'overlay';
  animation?: 'pulse' | 'wave' | false;
  length?: number | IRange;
};

const staticStyles = stylex.create({
  length: (length?: number) => ({
    width: length !== undefined ? `${length}ch` : '100%',
  }),
});

export const Skeleton = forwardRef<HTMLDivElement, ISkeletonProps>(
  function Skeleton(props, ref) {
    const {
      styles,
      sx,
      children,
      loading = true,
      variant = 'rectangular',
      animation = 'pulse',
      length: lengthProp,
      ...other
    } = props;

    const { theme } = useComponentTheme('Skeleton');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(theme.styles, styles),
      [theme.styles, styles],
    );
    const sxf = useMemo(
      () =>
        stylePropsFactory<ISkeletonStyleKey, ISkeletonStyleVarKey>(
          stylesCombinator,
        ),
      [stylesCombinator],
    );

    const lengthRef = useRef(
      typeof lengthProp === 'object' ? randomInRange(lengthProp) : lengthProp,
    );

    return loading ? (
      <div
        {...sxf(
          'host',
          theme.vars,
          `variant$${variant}`,
          variant === 'rectangular'
            ? lengthRef.current !== undefined
              ? staticStyles.length(lengthRef.current)
              : !children
                ? staticStyles.length()
                : undefined
            : undefined,
          animation ? `animation$${animation}` : undefined,
          sx,
        )}
        ref={ref}
        {...other}
      >
        <div {...sxf('hidden')}>{children ?? '%'}</div>
      </div>
    ) : (
      children
    );
  },
);
