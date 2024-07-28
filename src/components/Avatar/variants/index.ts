import type { StyleXStyles } from '@stylexjs/stylex';

import type { IAvatarVariant } from '../Avatar.types';
import { roundedAvatarStyles } from './RoundedAvatar.styles';
import { squaredAvatarStyles } from './SquaredAvatar.styles';

export const avatarVariantStyles: {
  [key in IAvatarVariant]: Record<string, StyleXStyles>;
} = {
  rounded: roundedAvatarStyles,
  squared: squaredAvatarStyles,
};
