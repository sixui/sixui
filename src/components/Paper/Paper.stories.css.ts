import { style } from '@vanilla-extract/css';

import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';

const classNames = {
  root: style({
    width: px(192),
  }),
  inner: style({
    position: 'relative',
    minHeight: px(128),
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '0%',
    justifyContent: 'flex-end',
    padding: px(space(4)),
  }),
};

export const paperStoriesStyles = {
  classNames,
};
