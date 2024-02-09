import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import * as stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IListItemStyleKey } from '@/components/atoms/ListItem';
import type { IRippleStyleKey } from '@/components/utils/Ripple';
import type { IFocusRingStyleKey } from '@/components/utils/FocusRing';
import type { IItemStyleKey } from '@/components/atoms/Item';
import { componentVars as vars } from './ListItem.stylex';
import { componentVars as listItemStatesVars } from './ListItem.states.stylex';
import { componentVars as rippleVars } from '../Ripple/Ripple.stylex';
import { componentVars as focusRingVars } from '../FocusRing/FocusRing.stylex';

// https://github.com/material-components/material-web/blob/main/list/internal/listitem/_list-item.scss
type IListItemStyles = IStyles<IListItemStyleKey>;
export const styles: MapNamespaces<IListItemStyles> =
  stylex.create<IListItemStyles>({
    host: {
      listStyle: 'none',
      borderRadius: vars.containerShape,

      // eslint-disable-next-line @stylexjs/valid-styles
      [listItemStatesVars.nonTextColor]: vars.nonTextColor,
      // eslint-disable-next-line @stylexjs/valid-styles
      [listItemStatesVars.textColor]: vars.textColor,
    },
    host$interactive: {
      cursor: 'pointer',

      [listItemStatesVars.nonTextColor]: {
        default: vars.nonTextColor,
        ':is([data-focused])': vars.nonTextColor$focus,
        ':is([data-hovered])': vars.nonTextColor$hover,
        ':is([data-pressed])': vars.nonTextColor$pressed,
      },

      [listItemStatesVars.textColor]: {
        default: vars.textColor,
        ':is([data-focused])': vars.textColor$focus,
        ':is([data-hovered])': vars.textColor$hover,
        ':is([data-pressed])': vars.textColor$pressed,
      },
    },
    host$selected: {
      [listItemStatesVars.nonTextColor]: {
        default: vars.selectedNonTextColor,
        ':is([data-focused])': vars.selectedNonTextColor$focus,
        ':is([data-hovered])': vars.selectedNonTextColor$hover,
        ':is([data-pressed])': vars.selectedNonTextColor$pressed,
      },

      [listItemStatesVars.textColor]: {
        default: vars.selectedTextColor,
        ':is([data-focused])': vars.selectedTextColor$focus,
        ':is([data-hovered])': vars.selectedTextColor$hover,
        ':is([data-pressed])': vars.selectedTextColor$pressed,
      },
    },
    host$disabled: {
      cursor: 'default',
      pointerEvents: 'none',

      // eslint-disable-next-line @stylexjs/valid-styles
      [listItemStatesVars.nonTextColor]: vars.nonTextColor$disabled,
      // eslint-disable-next-line @stylexjs/valid-styles
      [listItemStatesVars.nonTextOpacity]: vars.nonTextOpacity$disabled,
      // eslint-disable-next-line @stylexjs/valid-styles
      [listItemStatesVars.textColor]: vars.textColor$disabled,
      // eslint-disable-next-line @stylexjs/valid-styles
      [listItemStatesVars.textOpacity]: vars.textOpacity$disabled,
    },
    background: {
      position: 'absolute',
      inset: 0,
      borderRadius: 'inherit',
      backgroundColor: vars.containerColor,
    },
    background$selected: {
      backgroundColor: vars.selectedContainerColor,
    },
    background$disabled: {
      backgroundColor: vars.containerColor$disabled,
      opacity: vars.containerOpacity$disabled,
    },
  });

type IItemStyles = IStyles<IItemStyleKey>;
export const itemStyles: MapNamespaces<IItemStyles> = stylex.create<
  IStyles<IItemStyleKey>
>({
  host: {
    borderRadius: 'inherit',
    minHeight: vars.containerHeight$oneLine,
    paddingTop: vars.topSpace,
    paddingBottom: vars.bottomSpace,
    paddingInlineStart: vars.leadingSpace,
    paddingInlineEnd: vars.trailingSpace,
    // Hide android tap color since we have ripple
    // eslint-disable-next-line @stylexjs/valid-styles
    WebkitTapHighlightColor: 'transparent',
  },
  nonText: {
    color: listItemStatesVars.nonTextColor,
    opacity: listItemStatesVars.nonTextOpacity,
  },
  text: {
    color: listItemStatesVars.textColor,
    opacity: listItemStatesVars.textOpacity,
  },
  host$multiline: {
    minHeight: vars.containerHeight$twoLine,
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
    [focusRingVars.shape]: vars.containerShape,
  },
});
