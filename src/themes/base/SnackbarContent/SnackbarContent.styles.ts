import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { ISnackbarContentStyleKey } from '@/components/atoms/SnackbarContent';
import type { IElevationStyleKey } from '@/components/utils/Elevation';
import { componentVars as vars } from './SnackbarContent.stylex';
import { componentVars as snackbarStateVars } from './SnackbarContent.states.stylex';
import { componentVars as elevationVars } from '../Elevation/Elevation.stylex';

type ISnackbarContentStyles = IStyles<ISnackbarContentStyleKey>;
export const styles: MapNamespaces<ISnackbarContentStyles> =
  stylex.create<ISnackbarContentStyles>({
    host: {
      gap: vars.gap,
      position: 'relative',
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: vars.topSpace,
      paddingBottom: vars.bottomSpace,
      paddingLeft: vars.leadingSpace,
      paddingRight: vars.trailingSpace,
      backgroundColor: vars.containerColor,
      [snackbarStateVars.elevation]: vars.containerElevation,
      borderRadius: vars.containerShape,
      minHeight: vars.containerMinHeight,
      flexGrow: {
        default: 'initial',
        '@media (max-width: 600px)': 1,
      },
      minWidth: {
        default: vars.containerMinWidth,
        '@media (max-width: 600px)': 'unset',
      },
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
