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
      gap: vars.gap,
      position: 'relative',
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row',
      alignItems: 'center',
      minWidth: 320,
      width: 'fit-content',
      paddingTop: vars.topSpace,
      paddingBottom: vars.bottomSpace,
      paddingLeft: vars.leadingSpace,
      paddingRight: vars.trailingSpace,
      backgroundColor: vars.containerColor,
      [snackbarStateVars.elevation]: vars.containerElevation,
      borderRadius: vars.containerShape,
      minHeight: vars.containerMinHeight,
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
    },
    actions: {
      display: 'flex',
      flexDirection: 'row',
      marginLeft: 'auto',
      gap: vars.gap,
      alignItems: 'center',
      height: vars.supportingTextLineHeight,
      paddingTop: vars.topSpace,
      paddingBottom: vars.bottomSpace,
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
