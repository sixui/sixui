import stylex from '@stylexjs/stylex';

import { buttonTokens as buttonVars } from '@/components/atoms/Button/Button.stylex';
import { fabTokens } from './Fab.stylex';

// https://github.com/material-components/material-web/blob/main/fab/internal/_shared.scss
// https://github.com/material-components/material-web/blob/main/fab/internal/_fab.scss

export type IFabStyleKey = keyof typeof fabStyles;
export const fabStyles = stylex.create({
  host: {
    [buttonVars.leadingSpace]: '0',
    [buttonVars.trailingSpace]: '0',
    [buttonVars.leadingIconLeadingSpace]: '0',
    [buttonVars.leadingIconTrailingSpace]: '0',
    [buttonVars.trailingIconLeadingSpace]: '0',
    [buttonVars.trailingIconTrailingSpace]: '0',

    [buttonVars.gap]: '12px',
    [buttonVars.containerElevation$disabled]:
      fabTokens.containerElevation$disabled,
    [buttonVars.containerElevation]: fabTokens.containerElevation,
    [buttonVars.containerElevation$focus]: fabTokens.containerElevation$focus,
    [buttonVars.containerElevation$hover]: fabTokens.containerElevation$hover,
    [buttonVars.containerElevation$pressed]:
      fabTokens.containerElevation$pressed,
    [buttonVars.containerColor]: fabTokens.containerColor,
    [buttonVars.containerColor$disabled]: fabTokens.containerColor$disabled,
    [buttonVars.containerOpacity$disabled]: fabTokens.containerOpacity$disabled,
    [buttonVars.iconColor$disabled]: fabTokens.iconColor$disabled,
    [buttonVars.iconOpacity$disabled]: fabTokens.iconOpacity$disabled,
    [buttonVars.stateLayerOpacity$hover]: fabTokens.stateLayerOpacity$hover,
    [buttonVars.stateLayerOpacity$pressed]: fabTokens.stateLayerOpacity$pressed,
    [buttonVars.labelTextFont]: fabTokens.labelTextFont,
    [buttonVars.labelTextLineHeight]: fabTokens.labelTextLineHeight,
    [buttonVars.labelTextSize]: fabTokens.labelTextSize,
    [buttonVars.labelTextLetterSpacing]: fabTokens.labelTextLetterSpacing,
    [buttonVars.labelTextWeight]: fabTokens.labelTextWeight,
    [buttonVars.labelTextColor$disabled]: fabTokens.labelTextColor$disabled,
    [buttonVars.labelTextOpacity$disabled]: fabTokens.labelTextOpacity$disabled,

    [buttonVars.containerColor]: fabTokens.containerColor,
    [buttonVars.iconColor]: fabTokens.iconColor,
    [buttonVars.iconColor$hover]: fabTokens.iconColor$hover,
    [buttonVars.iconColor$focus]: fabTokens.iconColor$focus,
    [buttonVars.iconColor$pressed]: fabTokens.iconColor$pressed,
    [buttonVars.stateLayerColor$hover]: fabTokens.stateLayerColor$hover,
    [buttonVars.stateLayerColor$pressed]: fabTokens.stateLayerColor$pressed,
    [buttonVars.labelTextColor]: fabTokens.labelTextColor,
    [buttonVars.labelTextColor$hover]: fabTokens.labelTextColor$hover,
    [buttonVars.labelTextColor$focus]: fabTokens.labelTextColor$focus,
    [buttonVars.labelTextColor$pressed]: fabTokens.labelTextColor$pressed,
  },
  host$sm: {
    width: fabTokens.containerWidth$sm,
    height: fabTokens.containerHeight$sm,

    [buttonVars.containerShape]: fabTokens.containerShape$sm,
    [buttonVars.iconSize]: fabTokens.iconSize$sm,
  },
  host$md: {
    width: fabTokens.containerWidth$md,
    height: fabTokens.containerHeight$md,

    [buttonVars.containerShape]: fabTokens.containerShape$md,
    [buttonVars.iconSize]: fabTokens.iconSize$md,
  },
  host$lg: {
    width: fabTokens.containerWidth$lg,
    height: fabTokens.containerHeight$lg,

    [buttonVars.containerShape]: fabTokens.containerShape$lg,
    [buttonVars.iconSize]: fabTokens.iconSize$lg,
  },
  host$extended: {
    width: 'inherit',
    [buttonVars.leadingSpace]: '24px',
    [buttonVars.trailingSpace]: '24px',
    [buttonVars.leadingIconLeadingSpace]: '16px',
    [buttonVars.leadingIconTrailingSpace]: '24px',
  },
  host$lowered: {
    [buttonVars.containerElevation]: fabTokens.loweredContainerElevation,
    [buttonVars.containerElevation$focus]:
      fabTokens.loweredContainerElevation$focus,
    [buttonVars.containerElevation$hover]:
      fabTokens.loweredContainerElevation$hover,
    [buttonVars.containerElevation$pressed]:
      fabTokens.loweredContainerElevation$pressed,

    [buttonVars.containerColor]: fabTokens.loweredContainerColor,
  },
});
