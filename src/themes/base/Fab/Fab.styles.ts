import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IFabStyleKey } from '@/components/atoms/Fab';
import { componentVars as vars } from './Fab.stylex';
import { componentVars as buttonVars } from '../Button/Button.stylex';

// https://github.com/material-components/material-web/blob/main/fab/internal/_shared.scss
// https://github.com/material-components/material-web/blob/main/fab/internal/_fab.scss

type IFabStyles = IStyles<IFabStyleKey>;
export const styles: MapNamespaces<IFabStyles> = stylex.create<IFabStyles>({
  host: {
    [buttonVars.leadingSpace]: '0',
    [buttonVars.trailingSpace]: '0',
    [buttonVars.leadingIconLeadingSpace]: '0',
    [buttonVars.leadingIconTrailingSpace]: '0',
    [buttonVars.trailingIconLeadingSpace]: '0',
    [buttonVars.trailingIconTrailingSpace]: '0',

    [buttonVars.gap]: '12px',
    [buttonVars.containerElevation$disabled]: vars.containerElevation$disabled,
    [buttonVars.containerElevation]: vars.containerElevation,
    [buttonVars.containerElevation$focus]: vars.containerElevation$focus,
    [buttonVars.containerElevation$hover]: vars.containerElevation$hover,
    [buttonVars.containerElevation$pressed]: vars.containerElevation$pressed,
    [buttonVars.containerColor]: vars.containerColor,
    [buttonVars.containerColor$disabled]: vars.containerColor$disabled,
    [buttonVars.containerOpacity$disabled]: vars.containerOpacity$disabled,
    [buttonVars.iconColor$disabled]: vars.iconColor$disabled,
    [buttonVars.iconOpacity$disabled]: vars.iconOpacity$disabled,
    [buttonVars.stateLayerOpacity$hover]: vars.stateLayerOpacity$hover,
    [buttonVars.stateLayerOpacity$pressed]: vars.stateLayerOpacity$pressed,
    [buttonVars.labelTextFont]: vars.labelTextFont,
    [buttonVars.labelTextLineHeight]: vars.labelTextLineHeight,
    [buttonVars.labelTextSize]: vars.labelTextSize,
    [buttonVars.labelTextLetterSpacing]: vars.labelTextLetterSpacing,
    [buttonVars.labelTextWeight]: vars.labelTextWeight,
    [buttonVars.labelTextColor$disabled]: vars.labelTextColor$disabled,
    [buttonVars.labelTextOpacity$disabled]: vars.labelTextOpacity$disabled,

    [buttonVars.containerColor]: vars.containerColor,
    [buttonVars.iconColor]: vars.iconColor,
    [buttonVars.iconColor$hover]: vars.iconColor$hover,
    [buttonVars.iconColor$focus]: vars.iconColor$focus,
    [buttonVars.iconColor$pressed]: vars.iconColor$pressed,
    [buttonVars.stateLayerColor$hover]: vars.stateLayerColor$hover,
    [buttonVars.stateLayerColor$pressed]: vars.stateLayerColor$pressed,
    [buttonVars.labelTextColor]: vars.labelTextColor,
    [buttonVars.labelTextColor$hover]: vars.labelTextColor$hover,
    [buttonVars.labelTextColor$focus]: vars.labelTextColor$focus,
    [buttonVars.labelTextColor$pressed]: vars.labelTextColor$pressed,
  },
  host$sm: {
    width: vars.containerWidth$sm,
    height: vars.containerHeight$sm,

    [buttonVars.containerShape]: vars.containerShape$sm,
    [buttonVars.iconSize]: vars.iconSize$sm,
  },
  host$md: {
    width: vars.containerWidth$md,
    height: vars.containerHeight$md,

    [buttonVars.containerShape]: vars.containerShape$md,
    [buttonVars.iconSize]: vars.iconSize$md,
  },
  host$lg: {
    width: vars.containerWidth$lg,
    height: vars.containerHeight$lg,

    [buttonVars.containerShape]: vars.containerShape$lg,
    [buttonVars.iconSize]: vars.iconSize$lg,
  },
  host$extended: {
    width: 'inherit',
    [buttonVars.leadingSpace]: '24px',
    [buttonVars.trailingSpace]: '24px',
    [buttonVars.leadingIconLeadingSpace]: '16px',
    [buttonVars.leadingIconTrailingSpace]: '24px',
  },
  host$lowered: {
    [buttonVars.containerElevation]: vars.loweredContainerElevation,
    [buttonVars.containerElevation$focus]: vars.loweredContainerElevation$focus,
    [buttonVars.containerElevation$hover]: vars.loweredContainerElevation$hover,
    [buttonVars.containerElevation$pressed]:
      vars.loweredContainerElevation$pressed,

    [buttonVars.containerColor]: vars.loweredContainerColor,
  },
});
