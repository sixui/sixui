import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import * as stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { ITabStyleKey } from '@/components/atoms/Tab';
import { componentVars as vars } from './Tab.stylex';

// https://github.com/material-components/material-web/blob/main/tabs/internal/_primary-tab.scss

type ITabStyles = IStyles<ITabStyleKey>;
export const styles: MapNamespaces<ITabStyles> = stylex.create<ITabStyles>({
  content$stacked: {
    flexDirection: 'column',
    gap: '2px',
  },
  content$stacked$hasIcon$hasLabel: {
    height: vars.withIconAndLabelTextContainerHeight,
  },
});
