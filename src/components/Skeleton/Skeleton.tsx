import stylex from '@stylexjs/stylex';
import { forwardRef, useMemo, useRef } from 'react';
import { random } from 'lodash';

import type { ISkeletonProps } from './Skeleton.types';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { skeletonStyles } from './Skeleton.styles';
import { skeletonTheme } from './Skeleton.stylex';

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

    const { overridenStyles } = useComponentTheme('Skeleton');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(skeletonStyles, styles),
      [styles],
    );
    const sxf = useMemo(
      () => stylePropsFactory(stylesCombinator),
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
          skeletonTheme,
          overridenStyles,
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
