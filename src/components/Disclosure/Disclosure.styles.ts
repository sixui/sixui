import stylex from '@stylexjs/stylex';

import { listItemTokens } from '@/components/ListItem/ListItem.stylex';
import { disclosureTokens } from './Disclosure.stylex';

export type IDisclosureStylesKey = keyof typeof disclosureStyles;
export const disclosureStyles = stylex.create({
  host: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  panel: {
    color: disclosureTokens.textColor,
    marginTop: '1rem',
    paddingLeft: listItemTokens.leadingSpace,
  },
});