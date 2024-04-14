import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IDisclosurePanelStyleKey } from '@/components/atoms/DisclosurePanel';
import { componentVars as vars } from './DisclosurePanel.stylex';

type IDisclosurePanelStyles = IStyles<IDisclosurePanelStyleKey>;
export const styles: MapNamespaces<IDisclosurePanelStyles> =
  stylex.create<IDisclosurePanelStyles>({
    host: {
      paddingTop: '1rem',
      color: vars.textColor,
    },
    host$collapsed: {
      display: 'none',
    },
  });
