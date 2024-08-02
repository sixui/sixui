import stylex from '@stylexjs/stylex';
import { buttonTokens } from '~/components/Button/Button.stylex';

import { listItemTokens } from '~/components/ListItem/ListItem.stylex';

export const playgroundOptionDisclosureButtonStyles = stylex.create({
  button: {
    [listItemTokens.containerMinHeight$md]: buttonTokens.containerHeight,
  },
});
