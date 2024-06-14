import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { ISnackbarStyleKey } from '@/components/atoms/Snackbar';
import type { IElevationStyleKey } from '@/components/utils/Elevation';
import { componentVars as vars } from './Snackbar.stylex';
import { componentVars as snackbarStateVars } from './Snackbar.states.stylex';
import { componentVars as elevationVars } from '../Elevation/Elevation.stylex';

type ISnackbarStyles = IStyles<ISnackbarStyleKey>;
export const styles: MapNamespaces<ISnackbarStyles> =
  stylex.create<ISnackbarStyles>({
    host: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      minWidth: 320,
      width: 'fit-content',
      gap: vars.gap,
      paddingLeft: vars.leadingSpace,
      paddingRight: vars.trailingSpace,
      backgroundColor: vars.containerColor,
      [snackbarStateVars.elevation]: vars.containerElevation,
      borderRadius: vars.containerShape,
      minHeight: vars.containerMinHeight,
    },
    host$long: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      paddingTop: vars.topSpace,
      paddingBottom: vars.bottomSpace,
    },
    host$trailingAction: {
      paddingRight: vars.actionTrailingSpace,
    },
    host$trailingIcon: {
      paddingRight: vars.iconTrailingSpace,
    },
    supportingText: {
      flexGrow: 1,
      color: vars.supportingTextColor,
      fontFamily: vars.supportingTextFont,
      fontSize: vars.supportingTextSize,
      fontWeight: vars.supportingTextWeight,
      lineHeight: vars.supportingTextLineHeight,
      letterSpacing: vars.supportingTextLetterSpacing,
      paddingTop: vars.topSpace,
      paddingBottom: vars.bottomSpace,
    },
    supportingText$long: {
      paddingTop: 0,
      paddingBottom: 0,
    },
    actions: {
      display: 'flex',
      flexDirection: 'row',
      flexShrink: 0,
    },
    actions$long: {
      alignSelf: 'flex-end',
    },
  });

type IElevationStyles = IStyles<IElevationStyleKey>;
export const elevationStyles: MapNamespaces<IElevationStyles> = stylex.create<
  IStyles<IElevationStyleKey>
>({
  host: {
    [elevationVars.boxShadow]: snackbarStateVars.elevation,
  },
});
