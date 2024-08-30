import { style } from '@vanilla-extract/css';

import { px } from '~/helpers/styles/px';

const classNames = {
  container: style({
    width: px(96),
    height: px(96),
  }),
};

export const textStoriesStyles = {
  classNames,
};
