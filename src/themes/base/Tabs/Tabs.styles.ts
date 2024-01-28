import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import * as stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { ITabsStyleKey } from '@/components/atoms/Tabs';

type ITabsStyles = IStyles<ITabsStyleKey>;
export const styles: MapNamespaces<ITabsStyles> = stylex.create<ITabsStyles>({
  host: {},
});
