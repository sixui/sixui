import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import * as stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IListItemStyleKey } from '@/components/atoms/ListItem';
import type { IStateLayerStyleKey } from '@/components/utils/StateLayer';
import type { IFocusRingStyleKey } from '@/components/utils/FocusRing';
import type { IItemStyleKey } from '@/components/atoms/Item';
import { componentVars as vars } from './ListItem.stylex';
import { componentVars as listItemStatesVars } from './ListItem.states.stylex';
import { componentVars as statelayerVars } from '../StateLayer/StateLayer.stylex';
import { componentVars as focusRingVars } from '../FocusRing/FocusRing.stylex';

// https://github.com/material-components/material-web/blob/main/list/internal/listitem/_list-item.scss

type IListItemStyles = IStyles<IListItemStyleKey>;
export const styles: MapNamespaces<IListItemStyles> =
  stylex.create<IListItemStyles>({
    host: {
      listStyle: 'none',
      borderRadius: vars.containerShape,
      textDecoration: 'none',
      textAlign: 'start',

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
      opacity: vars.containerOpacity,
    },
    background$selected: {
      backgroundColor: vars.selectedContainerColor,
      opacity: vars.selectedContainerOpacity,
    },
    background$disabled: {
      backgroundColor: vars.containerColor$disabled,
      opacity: vars.containerOpacity$disabled,
    },
    icon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon$leading: {
      fontSize: vars.leadingIconSize,
      height: vars.leadingIconSize,
      width: vars.leadingIconSize,

      color: {
        default: vars.leadingIconColor,
        ':is([data-focused])': vars.leadingIconColor$focus,
        ':is([data-hovered])': vars.leadingIconColor$hover,
        ':is([data-pressed])': vars.leadingIconColor$pressed,
      },
    },
    icon$leading$selected: {
      color: {
        default: vars.selectedLeadingIconColor,
        ':is([data-focused])': vars.selectedLeadingIconColor$focus,
        ':is([data-hovered])': vars.selectedLeadingIconColor$hover,
        ':is([data-pressed])': vars.selectedLeadingIconColor$pressed,
      },
    },
    icon$leading$disabled: {
      color: vars.leadingIconColor$disabled,
      opacity: vars.leadingIconOpacity$disabled,
    },
    icon$trailing: {
      fontSize: vars.trailingIconSize,
      height: vars.trailingIconSize,
      width: vars.trailingIconSize,

      color: {
        default: vars.trailingIconColor,
        ':is([data-focused])': vars.trailingIconColor$focus,
        ':is([data-hovered])': vars.trailingIconColor$hover,
        ':is([data-pressed])': vars.trailingIconColor$pressed,
      },
    },
    icon$trailing$selected: {
      color: {
        default: vars.selectedTrailingIconColor,
        ':is([data-focused])': vars.selectedTrailingIconColor$focus,
        ':is([data-hovered])': vars.selectedTrailingIconColor$hover,
        ':is([data-pressed])': vars.selectedTrailingIconColor$pressed,
      },
    },
    icon$trailing$disabled: {
      color: vars.trailingIconColor$disabled,
      opacity: vars.trailingIconOpacity$disabled,
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
    // Hide android tap color since we have statelayer
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

type IStateLayerStyles = IStyles<IStateLayerStyleKey>;
export const stateLayerStyles: MapNamespaces<IStateLayerStyles> = stylex.create<
  IStyles<IStateLayerStyleKey>
>({
  host: {
    borderRadius: 'inherit',

    // eslint-disable-next-line @stylexjs/valid-styles
    [statelayerVars.color$hover]: vars.stateLayerColor$hover,
    // eslint-disable-next-line @stylexjs/valid-styles
    [statelayerVars.opacity$hover]: vars.stateLayerOpacity$hover,
    // eslint-disable-next-line @stylexjs/valid-styles
    [statelayerVars.color$pressed]: vars.stateLayerColor$pressed,
    // eslint-disable-next-line @stylexjs/valid-styles
    [statelayerVars.opacity$pressed]: vars.stateLayerOpacity$pressed,
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
