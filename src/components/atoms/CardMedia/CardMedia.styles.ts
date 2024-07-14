import stylex from '@stylexjs/stylex';

import { cardMediaTokens as vars } from './CardMedia.stylex';

export type ICardMediaStylesKey = keyof typeof cardMediaStyles;
export const cardMediaStyles = stylex.create({
  host: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    borderRadius: vars.containerShape,
    flexShrink: 0,
  },
  host$image: {
    objectFit: 'cover',
  },
});
