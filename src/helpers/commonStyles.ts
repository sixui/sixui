import stylex from '@stylexjs/stylex';

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
});
