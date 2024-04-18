import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { ICircularProgressIndicatorStyleKey } from '@/components/atoms/CircularProgressIndicator';
import { componentVars as vars } from './CircularProgressIndicator.stylex';
import { colorRolesVars } from '../vars/colorRoles.stylex';
import { typescaleVars } from '../vars/typo.stylex';
import { stateVars } from '../vars/state.stylex';

// https://github.com/material-components/material-web/blob/main/progress/internal/_circulardeterminate-progress.scss

type ICircularProgressIndicatorStyles =
  IStyles<ICircularProgressIndicatorStyleKey>;
export const styles: MapNamespaces<ICircularProgressIndicatorStyles> =
  stylex.create<ICircularProgressIndicatorStyles>({
    host: {
      display: 'inline-flex',
      verticalAlign: 'middle',
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',

      // `contain` and `content-visibility` are performance optimizations
      // important here because progress indicators are often used when a cpu
      // intensive task is underway so it's especially important to minimize
      // their cpu consumption.
      contain: 'strict',
      contentVisibility: 'auto',
    },
    host$md: {
      width: vars.size$md,
      height: vars.size$md,
    },
    host$lg: {
      width: vars.size$lg,
      height: vars.size$lg,
    },
    layer: {
      position: 'absolute',
      inset: 0,
      borderColor: 'inherit',
    },
    progress: {
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: '0%',
      alignSelf: 'stretch',
    },
    progress$md: {
      margin: vars.containerPadding$md,
    },
    progress$lg: {
      margin: vars.containerPadding$lg,
    },
    label: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      color: colorRolesVars.onSurface,
      fontFamily: typescaleVars.labelFont$sm,
      fontSize: typescaleVars.labelSize$sm,
      fontWeight: typescaleVars.labelWeight$sm,
      lineHeight: typescaleVars.labelLineHeight$sm,
      letterSpacing: typescaleVars.labelLetterSpacing$sm,
    },
    label$disabled: {
      opacity: stateVars.opacity$disabled,
    },
  });
