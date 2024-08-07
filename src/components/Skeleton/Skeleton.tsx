import stylex from '@stylexjs/stylex';
import { forwardRef, useRef } from 'react';

import type { ISkeletonProps } from './Skeleton.types';
import { random } from '~/helpers/random';
import { useStyles } from '~/hooks/useStyles';
import { Base } from '../Base';
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

    const { combineStyles, getStyles, globalStyles } = useStyles({
      name: 'Skeleton',
      styles: [skeletonStyles, styles],
    });

    const animation = hasError ? undefined : animationProp;
    const lengthRef = useRef(
      typeof lengthProp === 'object' ? random(lengthProp) : lengthProp,
    );

    return loaded ? (
      children
    ) : (
      <Base
        {...other}
        sx={[
          skeletonTheme,
          globalStyles,
          variant === 'rectangular'
            ? lengthRef.current !== undefined
              ? staticStyles.length(lengthRef.current)
              : !children
                ? staticStyles.length()
                : undefined
            : undefined,
          combineStyles(
            'host',
            hasError ? 'host$error' : null,
            `host$${variant}`,
            !!animation && `animation$${animation}`,
          ),
          sx,
        ]}
        ref={forwardedRef}
      >
        <div {...getStyles('hidden')}>{children ?? '%'}</div>
      </Base>
    );
  },
);
