import stylex from '@stylexjs/stylex';

import { listItemTokens } from '../ListItem/ListItem.stylex';

export const filterableListItemStyles = stylex.create({
  content$iconFocus: {
    fontSize: listItemTokens.leadingIconSize,
  },
});

export const filterableListItemFocusStyles = stylex.create({
  content: {
    textAlign: 'center',
  },
  supportingText: {
    textAlign: 'center',
  },
});
