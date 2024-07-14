import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IListItemStyleKey } from '@/components/atoms/ListItem';
import type { IStateLayerStyleKey } from '@/components/utils/StateLayer';
import type { IFocusRingStyleKey } from '@/components/utils/FocusRing';
import type { IItemStylesKey } from '@/components/atoms/Item';
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
      width: 'inherit',

      [listItemStatesVars.nonTextColor]: vars.nonTextColor,
      [listItemStatesVars.textColor]: vars.textColor,
    },
    host$sm: {
      [listItemStatesVars.containerMinHeight]: vars.containerMinHeight$sm,
      [listItemStatesVars.topSpace]: vars.topSpace$sm,
      [listItemStatesVars.bottomSpace]: vars.bottomSpace$sm,
    },
    host$md: {
      [listItemStatesVars.containerMinHeight]: vars.containerMinHeight$md,
      [listItemStatesVars.topSpace]: vars.topSpace$md,
      [listItemStatesVars.bottomSpace]: vars.bottomSpace$md,
    },
    host$lg: {
      [listItemStatesVars.containerMinHeight]: vars.containerMinHeight$lg,
      [listItemStatesVars.topSpace]: vars.topSpace$lg,
      [listItemStatesVars.bottomSpace]: vars.bottomSpace$lg,
    },
    host$xl: {
      [listItemStatesVars.containerMinHeight]: vars.containerMinHeight$xl,
      [listItemStatesVars.topSpace]: vars.topSpace$xl,
      [listItemStatesVars.bottomSpace]: vars.bottomSpace$xl,
    },
    host$leadingSpace: {
      [listItemStatesVars.leadingSpace]: vars.leadingSpace,
    },
    host$trailingSpace: {
      [listItemStatesVars.trailingSpace]: vars.trailingSpace,
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

      [listItemStatesVars.nonTextColor]: vars.nonTextColor$disabled,
      [listItemStatesVars.nonTextOpacity]: vars.nonTextOpacity$disabled,
      [listItemStatesVars.textColor]: vars.textColor$disabled,
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
    leading: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    trailing: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {},
    icon$leading: {
      fontSize: vars.leadingIconSize,
      height: vars.leadingIconSize,
      width: vars.leadingIconSize,
      textAlign: 'center',

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
    image: {
      width: vars.imageWidth,
      height: vars.imageHeight,
      backgroundSize: 'cover',
    },
    video: {
      height: vars.videoHeight,
      objectFit: 'cover',
    },
    icon$trailing: {
      fontSize: vars.trailingIconSize,
      height: vars.trailingIconSize,
      width: vars.trailingIconSize,
      textAlign: 'center',

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

type IItemStyles = IStyles<IItemStylesKey>;
export const itemStyles: MapNamespaces<IItemStyles> = stylex.create<
  IStyles<IItemStylesKey>
>({
  host: {
    borderRadius: 'inherit',
    minHeight: listItemStatesVars.containerMinHeight,
    WebkitTapHighlightColor: 'transparent',
    paddingInlineStart: listItemStatesVars.leadingSpace,
    paddingInlineEnd: listItemStatesVars.trailingSpace,
    paddingTop: listItemStatesVars.topSpace,
    paddingBottom: listItemStatesVars.bottomSpace,
  },
  nonText: {
    color: listItemStatesVars.nonTextColor,
    opacity: listItemStatesVars.nonTextOpacity,
  },
  content: {},
  text: {
    color: listItemStatesVars.textColor,
    opacity: listItemStatesVars.textOpacity,
  },
});

type IStateLayerStyles = IStyles<IStateLayerStyleKey>;
export const stateLayerStyles: MapNamespaces<IStateLayerStyles> = stylex.create<
  IStyles<IStateLayerStyleKey>
>({
  host: {
    borderRadius: 'inherit',

    [statelayerVars.color$hover]: vars.stateLayerColor$hover,
    [statelayerVars.opacity$hover]: vars.stateLayerOpacity$hover,
    [statelayerVars.color$pressed]: vars.stateLayerColor$pressed,
    [statelayerVars.opacity$pressed]: vars.stateLayerOpacity$pressed,
  },
});

type IFocusRingStyles = IStyles<IFocusRingStyleKey>;
export const focusRingStyles: MapNamespaces<IFocusRingStyles> = stylex.create<
  IStyles<IFocusRingStyleKey>
>({
  host: {
    zIndex: 1,
    [focusRingVars.shape]: vars.containerShape,
  },
});
