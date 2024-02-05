import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import * as stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IAnchoredStyleKey } from '@/components/utils/Anchored';
import { componentVars as anchoredStateVars } from './Anchored.states.stylex';

type IAnchoredStyles = IStyles<IAnchoredStyleKey>;
export const styles: MapNamespaces<IAnchoredStyles> =
  stylex.create<IAnchoredStyles>({
    host: {
      position: 'relative',
      display: 'inline-flex',
      verticalAlign: 'middle',
    },
    content: {
      position: 'absolute',
      display: 'flex',
      transform: `${anchoredStateVars.horizontalTransform} ${anchoredStateVars.verticalTransform}`,
    },
    content$start$square: {
      left: 0,
      // eslint-disable-next-line @stylexjs/valid-styles
      [anchoredStateVars.horizontalTransform]: 'translateX(-25%)',
    },
    content$start$circular: {
      left: '14%',
      // eslint-disable-next-line @stylexjs/valid-styles
      [anchoredStateVars.horizontalTransform]: 'translateX(-50%)',
    },
    content$end$square: {
      right: 0,
      // eslint-disable-next-line @stylexjs/valid-styles
      [anchoredStateVars.horizontalTransform]: 'translateX(25%)',
    },
    content$end$circular: {
      right: '14%',
      // eslint-disable-next-line @stylexjs/valid-styles
      [anchoredStateVars.horizontalTransform]: 'translateX(50%)',
    },
    content$top$square: {
      top: 0,
      // eslint-disable-next-line @stylexjs/valid-styles
      [anchoredStateVars.verticalTransform]: 'translateY(-25%)',
    },
    content$top$circular: {
      top: '14%',
      // eslint-disable-next-line @stylexjs/valid-styles
      [anchoredStateVars.verticalTransform]: 'translateY(-50%)',
    },
    content$bottom$square: {
      bottom: 0,
      // eslint-disable-next-line @stylexjs/valid-styles
      [anchoredStateVars.verticalTransform]: 'translateY(25%)',
    },
    content$bottom$circular: {
      bottom: '14%',
      // eslint-disable-next-line @stylexjs/valid-styles
      [anchoredStateVars.verticalTransform]: 'translateY(50%)',
    },
  });
