import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IRichTooltipContentStyleKey } from '@/components/atoms/RichTooltipContent';
import type { IElevationStyleKey } from '@/components/utils/Elevation';
import { componentVars as vars } from './RichTooltipContent.stylex';
import { componentVars as elevationVars } from '../Elevation/Elevation.stylex';
import { colorRolesVars } from '../vars/colorRoles.stylex';

type IRichTooltipContentStyles = IStyles<IRichTooltipContentStyleKey>;
export const styles: MapNamespaces<IRichTooltipContentStyles> =
  stylex.create<IRichTooltipContentStyles>({
    host: {
      position: 'relative',
      width: 'max-content',
      borderRadius: vars.containerShape,
      backgroundColor: vars.containerColor,
      maxWidth: vars.containerMaxWidth,
      paddingLeft: vars.leadingSpace,
      paddingRight: vars.trailingSpace,
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      gap: vars.gap,
      paddingTop: vars.topSpace,
      paddingBottom: vars.bottomSpace,
    },
    subhead: {
      color: vars.subheadColor,
      fontFamily: vars.subheadFont,
      fontSize: vars.subheadSize,
      fontWeight: vars.subheadWeight,
      lineHeight: vars.subheadLineHeight,
      letterSpacing: vars.subheadLetterSpacing,
    },
    supportingText: {
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
      gap: 8,
      paddingBottom: vars.actionsBottomSpace,
      flexWrap: 'wrap',
      marginLeft: -8,
    },
    cursor: {
      fill: colorRolesVars.primary,
    },
  });

type IElevationStyles = IStyles<IElevationStyleKey>;
export const elevationStyles: MapNamespaces<IElevationStyles> = stylex.create<
  IStyles<IElevationStyleKey>
>({
  host: {
    [elevationVars.boxShadow]: vars.containerElevation,
  },
});
