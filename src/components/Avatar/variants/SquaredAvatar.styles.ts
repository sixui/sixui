import stylex from '@stylexjs/stylex';

import { shapeTokens } from '~/themes/base/shape.stylex';
import { avatarTokens } from '../Avatar.stylex';

export const squaredAvatarStyles = stylex.create({
  host: {
    [avatarTokens.containerShape]: shapeTokens.corner$sm,
  },
});
