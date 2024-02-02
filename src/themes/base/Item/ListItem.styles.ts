import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import * as stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IListItemStyleKey } from '@/components/atoms/ListItem';
import type { IRippleStyleKey } from '@/components/utils/Ripple';
import type { IFocusRingStyleKey } from '@/components/utils/FocusRing';
import type { IItemStyleKey } from '@/components/atoms/Item';
import { componentVars as vars } from '../Item/Item.stylex';
import { componentVars as rippleVars } from '../Ripple/Ripple.stylex';
import { componentVars as focusRingVars } from '../FocusRing/FocusRing.stylex';

// https://github.com/material-components/material-web/blob/main/list/internal/listitem/_list-item.scss
type IListItemStyles = IStyles<IListItemStyleKey>;
export const styles: MapNamespaces<IListItemStyles> =
  stylex.create<IListItemStyles>({
    host: {
      borderRadius: vars.containerShape,
      display: 'flex',
      // hide android tap color since we have ripple
      // eslint-disable-next-line @stylexjs/valid-styles
      WebkitTapHighlightColor: 'transparent',
    },
    host$disabled: {
      cursor: 'default',
    },
    listItem: {
      // Resets. These can be removed once we're no longer use these tags
      background: 'none',
      borderStyle: 'unset',
      cursor: 'inherit',
      padding: 0,
      margin: 0,
      textAlign: 'unset',
      textDecoration: 'none',

      borderRadius: 'inherit',
      display: 'flex',
      width: '100%',
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 0,
      minWidth: 'inherit',
      maxWidth: 'inherit',
      outline: 'none',
      // hide android tap color since we have ripple
      // eslint-disable-next-line @stylexjs/valid-styles
      WebkitTapHighlightColor: 'transparent',
    },
    listItem$interactive: {
      cursor: 'pointer',
    },
    listItem$disabled: {
      opacity: vars.opacity$disabled,
      pointerEvents: 'none',
    },
  });

type IItemStyles = IStyles<IItemStyleKey>;
export const itemStyles: MapNamespaces<IItemStyles> = stylex.create<
  IStyles<IItemStyleKey>
>({
  host: {
    borderRadius: 'inherit',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    height: '100%',
    color: vars.labelTextColor,
    fontFamily: vars.labelTextFont,
    fontSize: vars.labelTextSize,
    letterSpacing: vars.labelTextLetterSpacing,
    lineHeight: vars.labelTextLineHeight,
    fontWeight: vars.labelTextWeight,
    minHeight: vars.containerHeight$oneLine,
    paddingTop: vars.topSpace,
    paddingBottom: vars.bottomSpace,
    paddingInlineStart: vars.leadingSpace,
    paddingInlineEnd: vars.trailingSpace,
  },
  host$multiline: {
    minHeight: vars.containerHeight$twoLine,
  },
  start: {
    color: vars.leadingIconColor,
  },
  end: {
    color: vars.trailingIconColor,
  },
  supportingText: {
    color: vars.supportingTextColor,
    fontFamily: vars.supportingTextFont,
    fontSize: vars.supportingTextSize,
    fontWeight: vars.supportingTextWeight,
    lineHeight: vars.supportingTextLineHeight,
    letterSpacing: vars.supportingTextLetterSpacing,
  },
  trailingSupportingText: {
    color: vars.trailingSupportingTextColor,
    fontFamily: vars.trailingSupportingTextFont,
    fontSize: vars.trailingSupportingTextSize,
    fontWeight: vars.trailingSupportingTextWeight,
    lineHeight: vars.trailingSupportingTextLineHeight,
    letterSpacing: vars.trailingSupportingTextLetterSpacing,
  },
  children: {
    pointerEvents: 'none',
  },
});

type IRippleStyles = IStyles<IRippleStyleKey>;
export const rippleStyles: MapNamespaces<IRippleStyles> = stylex.create<
  IStyles<IRippleStyleKey>
>({
  host: {
    borderRadius: 'inherit',

    // eslint-disable-next-line @stylexjs/valid-styles
    [rippleVars.color$hover]: vars.stateLayerColor$hover,
    // eslint-disable-next-line @stylexjs/valid-styles
    [rippleVars.opacity$hover]: vars.stateLayerOpacity$hover,
    // eslint-disable-next-line @stylexjs/valid-styles
    [rippleVars.color$pressed]: vars.stateLayerColor$pressed,
    // eslint-disable-next-line @stylexjs/valid-styles
    [rippleVars.opacity$pressed]: vars.stateLayerOpacity$pressed,
  },
});

type IFocusRingStyles = IStyles<IFocusRingStyleKey>;
export const focusRingStyles: MapNamespaces<IFocusRingStyles> = stylex.create<
  IStyles<IFocusRingStyleKey>
>({
  host: {
    zIndex: 1,
    // eslint-disable-next-line @stylexjs/valid-styles
    [focusRingVars.shape]: 8,
  },
});
