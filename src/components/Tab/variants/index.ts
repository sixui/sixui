import type { StyleXStyles } from '@stylexjs/stylex';

import type { ITabVariant } from '../Tab.types';
import { primaryTabStyles } from './PrimaryTab.styles';
import { secondaryTabStyles } from './SecondaryTab.styles';

export const tabVariantStyles: {
  [key in ITabVariant]: Record<string, StyleXStyles>;
} = {
  primary: primaryTabStyles,
  secondary: secondaryTabStyles,
};
