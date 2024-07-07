import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IDisclosurePanelStyleKey } from '@/components/atoms/DisclosurePanel';
import { componentVars as vars } from './DisclosurePanel.stylex';
import { componentVars as listItemVars } from '../ListItem/ListItem.stylex';
import { motionVars } from '../vars/motion.stylex';

type IDisclosurePanelStyles = IStyles<IDisclosurePanelStyleKey>;
export const styles: MapNamespaces<IDisclosurePanelStyles> =
  stylex.create<IDisclosurePanelStyles>({
    host: {
      color: vars.textColor,
    },
    content: {
      paddingTop: '1rem',
      paddingLeft: listItemVars.leadingSpace,
    },
    animation$onEnterActive: {
      opacity: 1,
      transitionProperty: 'opacity, height',
      transitionDuration: motionVars.duration$long3,
      transitionTimingFunction: motionVars.easing$emphasizedDecelerate,
    },
    animation$onExitActive: {
      opacity: 0,
      transitionProperty: 'opacity, height',
      transitionDuration: motionVars.duration$short3,
      transitionTimingFunction: motionVars.easing$emphasizedAccelerate,
    },
  });
