import { useRef } from 'react';
import { assignInlineVars } from '@vanilla-extract/dynamic';

import type { ISkeletonThemeFactory } from './Skeleton.css';
import type { ISkeletonFactory } from './Skeleton.types';
import { Paper } from '~/components/Paper';
import { random } from '~/helpers/random';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { skeletonTheme, skeletonThemeVariants } from './Skeleton.css';

const COMPONENT_NAME = 'Skeleton';

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
      animation,
      length: lengthProp,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<ISkeletonThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: skeletonTheme,
      themeVariants: skeletonThemeVariants,
      modifiers: {
        animation,
      },
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
        })}
        ref={forwardedRef}
        {...other}
      >
        <div {...getStyles('content')}>{children ?? '%'}</div>
      </Paper>
    );
  },
);

Skeleton.theme = skeletonTheme;
Skeleton.displayName = `@sixui/${COMPONENT_NAME}`;
