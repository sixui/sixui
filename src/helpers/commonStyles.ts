import type { Placement } from '@floating-ui/react';
import stylex from '@stylexjs/stylex';

import { placementToOrigin } from './placementToOrigin';

export const commonStyles = stylex.create({
  truncateLines: (lineCount: number) => ({
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    hyphens: 'auto',
    WebkitLineClamp: lineCount,
  }),
  backgroundImage: (src: string) => ({
    backgroundImage: `url("${src}")`,
  }),
  horizontalLayout: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '0.5rem',
  },
  verticalLayout: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  gap$none: {
    gap: 0,
  },
  gap$xs: {
    gap: '0.125rem',
  },
  gap$sm: {
    gap: '0.25rem',
  },
  gap$md: {
    gap: '0.5rem',
  },
  gap$lg: {
    gap: '0.75rem',
  },
  gap$xl: {
    gap: '1rem',
  },
  gap$2xl: {
    gap: '1.5rem',
  },
  gap$3xl: {
    gap: '2rem',
  },
  wrap: {
    flexWrap: 'wrap',
  },
  hidden: {
    display: 'none',
  },
  placementToTransformOrigin: (placement: Placement) => ({
    transformOrigin: placementToOrigin(placement),
  }),
  transformOrigin: (transformOrigin: string) => ({
    transformOrigin,
  }),
});
