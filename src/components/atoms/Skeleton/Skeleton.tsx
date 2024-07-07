import stylex from '@stylexjs/stylex';
import { forwardRef, useMemo, useRef } from 'react';
import { random } from 'lodash';

import type { IContainerProps, IRange } from '@/helpers/types';
import type {
  ISkeletonStyleKey,
  ISkeletonStyleVarKey,
} from './Skeleton.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';

export type ISkeletonProps = IContainerProps<ISkeletonStyleKey> & {
  children?: React.ReactNode;
  loaded?: boolean;
  variant?: 'rectangular' | 'circular' | 'overlay';
  animation?: 'pulse' | 'wave' | false;
  length?: number | IRange;
  hasError?: boolean;
};

const staticStyles = stylex.create({
  length: (length?: number) => ({
    width: length !== undefined ? `${length}ch` : '100%',
  }),
});

export const Skeleton = forwardRef<HTMLDivElement, ISkeletonProps>(
  function Skeleton(props, forwardedRef) {
    const {
      styles,
      sx,
      children,
      loaded,
      variant = 'rectangular',
      animation: animationProp = 'pulse',
      length: lengthProp,
      hasError,
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

    const animation = hasError ? undefined : animationProp;
    const lengthRef = useRef(
      typeof lengthProp === 'object'
        ? random(lengthProp.min, lengthProp.max)
        : lengthProp,
    );

    return loaded ? (
      children
    ) : (
      <div
        {...sxf(
          'host',
          hasError ? 'host$error' : null,
          `host$${variant}`,
          variant === 'rectangular'
            ? lengthRef.current !== undefined
              ? staticStyles.length(lengthRef.current)
              : !children
                ? staticStyles.length()
                : undefined
            : undefined,
          animation ? `animation$${animation}` : undefined,
          theme.vars,
          sx,
        )}
        ref={forwardedRef}
        {...other}
      >
        <div {...sxf('hidden')}>{children ?? '%'}</div>
      </div>
    );
  },
);
