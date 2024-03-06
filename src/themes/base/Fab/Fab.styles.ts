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
    // eslint-disable-next-line @stylexjs/valid-styles
    [buttonVars.leadingSpace]: '0',
    // eslint-disable-next-line @stylexjs/valid-styles
    [buttonVars.trailingSpace]: '0',
    // eslint-disable-next-line @stylexjs/valid-styles
    [buttonVars.leadingIconLeadingSpace]: '0',
    // eslint-disable-next-line @stylexjs/valid-styles
    [buttonVars.leadingIconTrailingSpace]: '0',
    // eslint-disable-next-line @stylexjs/valid-styles
    [buttonVars.trailingIconLeadingSpace]: '0',
    // eslint-disable-next-line @stylexjs/valid-styles
    [buttonVars.trailingIconTrailingSpace]: '0',

    // eslint-disable-next-line @stylexjs/valid-styles
    [buttonVars.gap]: '12px',
    // eslint-disable-next-line @stylexjs/valid-styles
    [buttonVars.containerElevation$disabled]: vars.containerElevation$disabled,
    // eslint-disable-next-line @stylexjs/valid-styles
    [buttonVars.containerElevation]: vars.containerElevation,
    // eslint-disable-next-line @stylexjs/valid-styles
    [buttonVars.containerElevation$focus]: vars.containerElevation$focus,
    // eslint-disable-next-line @stylexjs/valid-styles
    [buttonVars.containerElevation$hover]: vars.containerElevation$hover,
    // eslint-disable-next-line @stylexjs/valid-styles
    [buttonVars.containerElevation$pressed]: vars.containerElevation$pressed,
    // eslint-disable-next-line @stylexjs/valid-styles
    [buttonVars.containerColor]: vars.containerColor,
    // eslint-disable-next-line @stylexjs/valid-styles
    [buttonVars.containerColor$disabled]: vars.containerColor$disabled,
    // eslint-disable-next-line @stylexjs/valid-styles
    [buttonVars.containerOpacity$disabled]: vars.containerOpacity$disabled,
    // eslint-disable-next-line @stylexjs/valid-styles
    [buttonVars.iconColor$disabled]: vars.iconColor$disabled,
    // eslint-disable-next-line @stylexjs/valid-styles
    [buttonVars.iconOpacity$disabled]: vars.iconOpacity$disabled,
    // eslint-disable-next-line @stylexjs/valid-styles
    [buttonVars.stateLayerOpacity$hover]: vars.stateLayerOpacity$hover,
    // eslint-disable-next-line @stylexjs/valid-styles
    [buttonVars.stateLayerOpacity$pressed]: vars.stateLayerOpacity$pressed,
    // eslint-disable-next-line @stylexjs/valid-styles
    [buttonVars.labelTextFont]: vars.labelTextFont,
    // eslint-disable-next-line @stylexjs/valid-styles
    [buttonVars.labelTextLineHeight]: vars.labelTextLineHeight,
    // eslint-disable-next-line @stylexjs/valid-styles
    [buttonVars.labelTextSize]: vars.labelTextSize,
    // eslint-disable-next-line @stylexjs/valid-styles
    [buttonVars.labelTextLetterSpacing]: vars.labelTextLetterSpacing,
    // eslint-disable-next-line @stylexjs/valid-styles
    [buttonVars.labelTextWeight]: vars.labelTextWeight,
    // eslint-disable-next-line @stylexjs/valid-styles
    [buttonVars.labelTextColor$disabled]: vars.labelTextColor$disabled,
    // eslint-disable-next-line @stylexjs/valid-styles
    [buttonVars.labelTextOpacity$disabled]: vars.labelTextOpacity$disabled,

    // eslint-disable-next-line @stylexjs/valid-styles
    [buttonVars.containerColor]: vars.containerColor,
    // eslint-disable-next-line @stylexjs/valid-styles
    [buttonVars.iconColor]: vars.iconColor,
    // eslint-disable-next-line @stylexjs/valid-styles
    [buttonVars.iconColor$hover]: vars.iconColor$hover,
    // eslint-disable-next-line @stylexjs/valid-styles
    [buttonVars.iconColor$focus]: vars.iconColor$focus,
    // eslint-disable-next-line @stylexjs/valid-styles
    [buttonVars.iconColor$pressed]: vars.iconColor$pressed,
    // eslint-disable-next-line @stylexjs/valid-styles
    [buttonVars.stateLayerColor$hover]: vars.stateLayerColor$hover,
    // eslint-disable-next-line @stylexjs/valid-styles
    [buttonVars.stateLayerColor$pressed]: vars.stateLayerColor$pressed,
    // eslint-disable-next-line @stylexjs/valid-styles
    [buttonVars.labelTextColor]: vars.labelTextColor,
    // eslint-disable-next-line @stylexjs/valid-styles
    [buttonVars.labelTextColor$hover]: vars.labelTextColor$hover,
    // eslint-disable-next-line @stylexjs/valid-styles
    [buttonVars.labelTextColor$focus]: vars.labelTextColor$focus,
    // eslint-disable-next-line @stylexjs/valid-styles
    [buttonVars.labelTextColor$pressed]: vars.labelTextColor$pressed,
  },
  host$sm: {
    width: vars.containerWidth$sm,
    height: vars.containerHeight$sm,

    // eslint-disable-next-line @stylexjs/valid-styles
    [buttonVars.containerShape]: vars.containerShape$sm,
    // eslint-disable-next-line @stylexjs/valid-styles
    [buttonVars.iconSize]: vars.iconSize$sm,
  },
  host$md: {
    width: vars.containerWidth$md,
    height: vars.containerHeight$md,

    // eslint-disable-next-line @stylexjs/valid-styles
    [buttonVars.containerShape]: vars.containerShape$md,
    // eslint-disable-next-line @stylexjs/valid-styles
    [buttonVars.iconSize]: vars.iconSize$md,
  },
  host$lg: {
    width: vars.containerWidth$lg,
    height: vars.containerHeight$lg,

    // eslint-disable-next-line @stylexjs/valid-styles
    [buttonVars.containerShape]: vars.containerShape$lg,
    // eslint-disable-next-line @stylexjs/valid-styles
    [buttonVars.iconSize]: vars.iconSize$lg,
  },
  host$extended: {
    width: 'inherit',
    // eslint-disable-next-line @stylexjs/valid-styles
    [buttonVars.leadingSpace]: '24px',
    // eslint-disable-next-line @stylexjs/valid-styles
    [buttonVars.trailingSpace]: '24px',
    // eslint-disable-next-line @stylexjs/valid-styles
    [buttonVars.leadingIconLeadingSpace]: '16px',
    // eslint-disable-next-line @stylexjs/valid-styles
    [buttonVars.leadingIconTrailingSpace]: '24px',
  },
  host$lowered: {
    // eslint-disable-next-line @stylexjs/valid-styles
    [buttonVars.containerElevation]: vars.loweredContainerElevation,
    // eslint-disable-next-line @stylexjs/valid-styles
    [buttonVars.containerElevation$focus]: vars.loweredContainerElevation$focus,
    // eslint-disable-next-line @stylexjs/valid-styles
    [buttonVars.containerElevation$hover]: vars.loweredContainerElevation$hover,
    // eslint-disable-next-line @stylexjs/valid-styles
    [buttonVars.containerElevation$pressed]:
      vars.loweredContainerElevation$pressed,

    // eslint-disable-next-line @stylexjs/valid-styles
    [buttonVars.containerColor]: vars.loweredContainerColor,
  },
});
