import stylex from '@stylexjs/stylex';

import { zIndexTokens } from '~/themes/base/zIndex.stylex';
import { buttonTokens } from '../Button/Button.stylex';
import { fabTokens } from './Fab.stylex';
import { spacingTokens } from '~/themes/base/spacing.stylex';

// https://github.com/material-components/material-web/blob/main/fab/internal/_shared.scss
// https://github.com/material-components/material-web/blob/main/fab/internal/_fab.scss

export type IFabStylesKey = keyof typeof fabStyles;
export const fabStyles = stylex.create({
  host: {
    zIndex: zIndexTokens.overlay,

    [buttonTokens.leadingSpace]: '0px',
    [buttonTokens.trailingSpace]: '0px',
    [buttonTokens.leadingIconLeadingSpace]: '0px',
    [buttonTokens.leadingIconTrailingSpace]: '0px',
    [buttonTokens.trailingIconLeadingSpace]: '0px',
    [buttonTokens.trailingIconTrailingSpace]: '0px',

    [buttonTokens.gap]: spacingTokens.padding$3,
    [buttonTokens.containerElevation$disabled]:
      fabTokens.containerElevation$disabled,
    [buttonTokens.containerElevation]: fabTokens.containerElevation,
    [buttonTokens.containerElevation$focus]: fabTokens.containerElevation$focus,
    [buttonTokens.containerElevation$hover]: fabTokens.containerElevation$hover,
    [buttonTokens.containerElevation$pressed]:
      fabTokens.containerElevation$pressed,
    [buttonTokens.containerColor]: fabTokens.containerColor,
    [buttonTokens.containerColor$disabled]: fabTokens.containerColor$disabled,
    [buttonTokens.containerOpacity$disabled]:
      fabTokens.containerOpacity$disabled,
    [buttonTokens.iconColor$disabled]: fabTokens.iconColor$disabled,
    [buttonTokens.iconOpacity$disabled]: fabTokens.iconOpacity$disabled,
    [buttonTokens.stateLayerOpacity$hover]: fabTokens.stateLayerOpacity$hover,
    [buttonTokens.stateLayerOpacity$pressed]:
      fabTokens.stateLayerOpacity$pressed,
    [buttonTokens.labelTextFont]: fabTokens.labelTextFont,
    [buttonTokens.labelTextLineHeight]: fabTokens.labelTextLineHeight,
    [buttonTokens.labelTextSize]: fabTokens.labelTextSize,
    [buttonTokens.labelTextLetterSpacing]: fabTokens.labelTextLetterSpacing,
    [buttonTokens.labelTextWeight]: fabTokens.labelTextWeight,
    [buttonTokens.labelTextColor$disabled]: fabTokens.labelTextColor$disabled,
    [buttonTokens.labelTextOpacity$disabled]:
      fabTokens.labelTextOpacity$disabled,

    [buttonTokens.containerColor]: fabTokens.containerColor,
    [buttonTokens.iconColor]: fabTokens.iconColor,
    [buttonTokens.iconColor$hover]: fabTokens.iconColor$hover,
    [buttonTokens.iconColor$focus]: fabTokens.iconColor$focus,
    [buttonTokens.iconColor$pressed]: fabTokens.iconColor$pressed,
    [buttonTokens.stateLayerColor$hover]: fabTokens.stateLayerColor$hover,
    [buttonTokens.stateLayerColor$pressed]: fabTokens.stateLayerColor$pressed,
    [buttonTokens.labelTextColor]: fabTokens.labelTextColor,
    [buttonTokens.labelTextColor$hover]: fabTokens.labelTextColor$hover,
    [buttonTokens.labelTextColor$focus]: fabTokens.labelTextColor$focus,
    [buttonTokens.labelTextColor$pressed]: fabTokens.labelTextColor$pressed,
  },
  host$sm: {
    width: fabTokens.containerWidth$sm,
    height: fabTokens.containerHeight$sm,

    [buttonTokens.containerShape]: fabTokens.containerShape$sm,
    [buttonTokens.iconSize]: fabTokens.iconSize$sm,
  },
  host$md: {
    width: fabTokens.containerWidth$md,
    height: fabTokens.containerHeight$md,

    [buttonTokens.containerShape]: fabTokens.containerShape$md,
    [buttonTokens.iconSize]: fabTokens.iconSize$md,
  },
  host$lg: {
    width: fabTokens.containerWidth$lg,
    height: fabTokens.containerHeight$lg,

    [buttonTokens.containerShape]: fabTokens.containerShape$lg,
    [buttonTokens.iconSize]: fabTokens.iconSize$lg,
  },
  host$extended: {
    width: 'inherit',
    [buttonTokens.leadingSpace]: spacingTokens.padding$6,
    [buttonTokens.trailingSpace]: spacingTokens.padding$6,
    [buttonTokens.leadingIconLeadingSpace]: spacingTokens.padding$4,
    [buttonTokens.leadingIconTrailingSpace]: spacingTokens.padding$6,
  },
  host$lowered: {
    [buttonTokens.containerElevation]: fabTokens.loweredContainerElevation,
    [buttonTokens.containerElevation$focus]:
      fabTokens.loweredContainerElevation$focus,
    [buttonTokens.containerElevation$hover]:
      fabTokens.loweredContainerElevation$hover,
    [buttonTokens.containerElevation$pressed]:
      fabTokens.loweredContainerElevation$pressed,

    [buttonTokens.containerColor]: fabTokens.loweredContainerColor,
  },
});
