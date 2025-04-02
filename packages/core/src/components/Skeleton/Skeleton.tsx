import { useRef } from 'react';
import { assignInlineVars } from '@vanilla-extract/dynamic';

import type { ISkeletonThemeFactory } from './Skeleton.css';
import type { ISkeletonFactory } from './Skeleton.types';
import { Paper } from '~/components/Paper';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { random } from '~/utils/random';
import { COMPONENT_NAME } from './Skeleton.constants';
import { skeletonTheme, skeletonThemeVariants } from './Skeleton.css';

export const Skeleton = componentFactory<ISkeletonFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant = 'rectangular',
      children,
      loaded,
      animation: animationProp = 'pulse',
      length: lengthProp,
      disabled,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const animation = disabled ? undefined : animationProp;

    const { getStyles } = useComponentTheme<ISkeletonThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: skeletonTheme,
      themeVariants: skeletonThemeVariants,
    });

    const lengthRef = useRef(
      typeof lengthProp === 'object' ? random(lengthProp) : lengthProp,
    );
    const length =
      variant === 'rectangular'
        ? lengthRef.current !== undefined
          ? `${lengthRef.current}ch`
          : !children
            ? '100%'
            : undefined
        : undefined;

    return loaded ? (
      children
    ) : (
      <Paper
        {...getStyles('root', {
          style: length
            ? assignInlineVars({
                [skeletonTheme.tokens.width]: length,
              })
            : undefined,
          modifiers: {
            animation,
          },
        })}
        ref={forwardedRef}
        {...other}
      >
        <div {...getStyles('content')}>{children ?? '%'}</div>
      </Paper>
    );
  },
);

Skeleton.displayName = `@sixui/core/${COMPONENT_NAME}`;
Skeleton.theme = skeletonTheme;
