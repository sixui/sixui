import stylex from '@stylexjs/stylex';

import { stateLayerTokens } from '~/components/StateLayer/StateLayer.stylex';
import { focusRingTokens } from '~/components/FocusRing/FocusRing.stylex';
import { itemTokens } from '~/components/Item/Item.stylex';
import { listItemStateTokens } from './ListItem.state.stylex';
import { listItemTokens } from './ListItem.stylex';

// https://github.com/material-components/material-web/blob/main/list/internal/listitem/_list-item.scss

export type IListItemStylesKey = keyof typeof listItemStyles;
export const listItemStyles = stylex.create({
  host: {
    listStyle: 'none',
    borderRadius: listItemTokens.containerShape,
    textDecoration: 'none',
    textAlign: 'start',
    width: 'inherit',

    [listItemStateTokens.nonTextColor]: listItemTokens.nonTextColor,
    [listItemStateTokens.textColor]: listItemTokens.textColor,
  },
  host$sm: {
    [listItemStateTokens.containerMinHeight]:
      listItemTokens.containerMinHeight$sm,
    [listItemStateTokens.topSpace]: listItemTokens.topSpace$sm,
    [listItemStateTokens.bottomSpace]: listItemTokens.bottomSpace$sm,
  },
  host$md: {
    [listItemStateTokens.containerMinHeight]:
      listItemTokens.containerMinHeight$md,
    [listItemStateTokens.topSpace]: listItemTokens.topSpace$md,
    [listItemStateTokens.bottomSpace]: listItemTokens.bottomSpace$md,
  },
  host$lg: {
    [listItemStateTokens.containerMinHeight]:
      listItemTokens.containerMinHeight$lg,
    [listItemStateTokens.topSpace]: listItemTokens.topSpace$lg,
    [listItemStateTokens.bottomSpace]: listItemTokens.bottomSpace$lg,
  },
  host$xl: {
    [listItemStateTokens.containerMinHeight]:
      listItemTokens.containerMinHeight$xl,
    [listItemStateTokens.topSpace]: listItemTokens.topSpace$xl,
    [listItemStateTokens.bottomSpace]: listItemTokens.bottomSpace$xl,
  },
  host$leadingSpace: {
    [listItemStateTokens.leadingSpace]: listItemTokens.leadingSpace,
  },
  host$trailingSpace: {
    [listItemStateTokens.trailingSpace]: listItemTokens.trailingSpace,
  },
  host$interactive: {
    cursor: 'pointer',

    [listItemStateTokens.nonTextColor]: {
      default: listItemTokens.nonTextColor,
      ':is([data-focused])': listItemTokens.nonTextColor$focus,
      ':is([data-hovered])': listItemTokens.nonTextColor$hover,
      ':is([data-pressed])': listItemTokens.nonTextColor$pressed,
    },

    [listItemStateTokens.textColor]: {
      default: listItemTokens.textColor,
      ':is([data-focused])': listItemTokens.textColor$focus,
      ':is([data-hovered])': listItemTokens.textColor$hover,
      ':is([data-pressed])': listItemTokens.textColor$pressed,
    },
  },
  host$selected: {
    [listItemStateTokens.nonTextColor]: {
      default: listItemTokens.selectedNonTextColor,
      ':is([data-focused])': listItemTokens.selectedNonTextColor$focus,
      ':is([data-hovered])': listItemTokens.selectedNonTextColor$hover,
      ':is([data-pressed])': listItemTokens.selectedNonTextColor$pressed,
    },

    [listItemStateTokens.textColor]: {
      default: listItemTokens.selectedTextColor,
      ':is([data-focused])': listItemTokens.selectedTextColor$focus,
      ':is([data-hovered])': listItemTokens.selectedTextColor$hover,
      ':is([data-pressed])': listItemTokens.selectedTextColor$pressed,
    },
  },
  host$disabled: {
    cursor: 'default',
    pointerEvents: 'none',

    [listItemStateTokens.nonTextColor]: listItemTokens.nonTextColor$disabled,
    [listItemStateTokens.nonTextOpacity]:
      listItemTokens.nonTextOpacity$disabled,
    [listItemStateTokens.textColor]: listItemTokens.textColor$disabled,
    [listItemStateTokens.textOpacity]: listItemTokens.textOpacity$disabled,
  },
  background: {
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    backgroundColor: listItemTokens.containerColor,
    opacity: listItemTokens.containerOpacity,
  },
  background$selected: {
    backgroundColor: listItemTokens.selectedContainerColor,
    opacity: listItemTokens.selectedContainerOpacity,
  },
  background$disabled: {
    backgroundColor: listItemTokens.containerColor$disabled,
    opacity: listItemTokens.containerOpacity$disabled,
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
    fontSize: listItemTokens.leadingIconSize,
    height: listItemTokens.leadingIconSize,
    width: listItemTokens.leadingIconSize,
    textAlign: 'center',

    color: {
      default: listItemTokens.leadingIconColor,
      ':is([data-focused])': listItemTokens.leadingIconColor$focus,
      ':is([data-hovered])': listItemTokens.leadingIconColor$hover,
      ':is([data-pressed])': listItemTokens.leadingIconColor$pressed,
    },
  },
  icon$leading$selected: {
    color: {
      default: listItemTokens.selectedLeadingIconColor,
      ':is([data-focused])': listItemTokens.selectedLeadingIconColor$focus,
      ':is([data-hovered])': listItemTokens.selectedLeadingIconColor$hover,
      ':is([data-pressed])': listItemTokens.selectedLeadingIconColor$pressed,
    },
  },
  icon$leading$disabled: {
    color: listItemTokens.leadingIconColor$disabled,
    opacity: listItemTokens.leadingIconOpacity$disabled,
  },
  image: {
    width: listItemTokens.imageWidth,
    height: listItemTokens.imageHeight,
    backgroundSize: 'cover',
  },
  video: {
    height: listItemTokens.videoHeight,
    objectFit: 'cover',
  },
  icon$trailing: {
    fontSize: listItemTokens.trailingIconSize,
    height: listItemTokens.trailingIconSize,
    width: listItemTokens.trailingIconSize,
    textAlign: 'center',

    color: {
      default: listItemTokens.trailingIconColor,
      ':is([data-focused])': listItemTokens.trailingIconColor$focus,
      ':is([data-hovered])': listItemTokens.trailingIconColor$hover,
      ':is([data-pressed])': listItemTokens.trailingIconColor$pressed,
    },
  },
  icon$trailing$selected: {
    color: {
      default: listItemTokens.selectedTrailingIconColor,
      ':is([data-focused])': listItemTokens.selectedTrailingIconColor$focus,
      ':is([data-hovered])': listItemTokens.selectedTrailingIconColor$hover,
      ':is([data-pressed])': listItemTokens.selectedTrailingIconColor$pressed,
    },
  },
  icon$trailing$disabled: {
    color: listItemTokens.trailingIconColor$disabled,
    opacity: listItemTokens.trailingIconOpacity$disabled,
  },
});

export const listItemItemStyles = stylex.create({
  host: {
    borderRadius: 'inherit',
    minHeight: listItemStateTokens.containerMinHeight,
    WebkitTapHighlightColor: 'transparent',
    paddingInlineStart: listItemStateTokens.leadingSpace,
    paddingInlineEnd: listItemStateTokens.trailingSpace,
    paddingTop: listItemStateTokens.topSpace,
    paddingBottom: listItemStateTokens.bottomSpace,

    [itemTokens.textColor]: listItemStateTokens.textColor,
    [itemTokens.nonTextColor]: listItemStateTokens.nonTextColor,
    [itemTokens.overlineColor]: listItemStateTokens.textColor,
    [itemTokens.headlineTextColor]: listItemStateTokens.textColor,
    [itemTokens.supportingTextColor]: listItemStateTokens.textColor,
    [itemTokens.trailingSupportingTextColor]: listItemStateTokens.textColor,
  },
  nonText: {
    opacity: listItemStateTokens.nonTextOpacity,
  },
  text: {
    opacity: listItemStateTokens.textOpacity,
  },
});

export const listItemStateLayerStyles = stylex.create({
  host: {
    borderRadius: 'inherit',

    [stateLayerTokens.color$hover]: listItemTokens.stateLayerColor$hover,
    [stateLayerTokens.opacity$hover]: listItemTokens.stateLayerOpacity$hover,
    [stateLayerTokens.color$pressed]: listItemTokens.stateLayerColor$pressed,
    [stateLayerTokens.opacity$pressed]:
      listItemTokens.stateLayerOpacity$pressed,
  },
});

export const listItemFocusRingStyles = stylex.create({
  host: {
    zIndex: 1,
    [focusRingTokens.shape]: listItemTokens.containerShape,
  },
});
