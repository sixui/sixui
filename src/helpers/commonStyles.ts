import stylex from '@stylexjs/stylex';

import { spacingTokens } from '~/themes/base/spacing.stylex';
import { scaleTokens } from '~/themes/base/scale.stylex';
import { densityTokens } from '~/themes/base/density.stylex';

export type IGap = 0 | 0.5 | 1 | 2 | 3 | 4 | 5 | 6;

const MIN_DENSITY = -6;
const MAX_DENSITY = 0;
const DENSITY = `${densityTokens.interval} * clamp(${MIN_DENSITY}, ${densityTokens.density}, ${MAX_DENSITY}) * ${scaleTokens.scale}`;

export type ICSSProperties = {
  align: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify:
    | 'start'
    | 'center'
    | 'end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  wrap: 'wrap' | 'nowrap';
};

export const commonStyles = stylex.create({
  truncateLines: (lineCount: number) => ({
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    hyphens: 'auto',
    WebkitLineClamp: lineCount,
  }),
  backgroundColor: (color: string) => ({
    backgroundColor: color,
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
  hidden: {
    display: 'none',
  },
  transformOrigin: (transformOrigin: string) => ({
    transformOrigin,
  }),
  gridTemplateColumns: (gridTemplateColumns: string) => ({
    gridTemplateColumns,
  }),
  fill: {
    flexGrow: 1,
  },
  expand: {
    width: '100%',
    height: '100%',
  },
  horizontalGap: (gap: IGap) => ({
    gap: gap ? spacingTokens[`padding$${gap}`] : '0',
  }),
  verticalGap: (gap: IGap) => ({
    gap: gap
      ? `max(${spacingTokens['padding$0.5']}, ${spacingTokens[`padding$${gap}`]} + ${DENSITY})`
      : '0',
  }),
  justifyContent: (justifyContent: ICSSProperties['justify']) => ({
    justifyContent,
  }),
  alignItems: (alignItems: ICSSProperties['align']) => ({
    alignItems,
  }),
  flexWrap: (flexWrap: ICSSProperties['wrap']) => ({
    flexWrap,
  }),
  width: (width: string | number) => ({
    width: `calc(${width} * ${scaleTokens.scale})`,
  }),
  height: (height: string | number) => ({
    height: `calc(${height} * ${scaleTokens.scale})`,
  }),
});
