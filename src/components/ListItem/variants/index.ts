import type { StyleXStyles } from '@stylexjs/stylex';

import type { IListItemVariant } from '../ListItem.types';
import { dangerListItemStyles } from './DangerListItem.styles';
import { standardListItemStyles } from './StandardListItem.styles';

export const listItemVariantStyles: {
  [key in IListItemVariant]: Record<string, StyleXStyles>;
} = {
  danger: dangerListItemStyles,
  standard: standardListItemStyles,
};
