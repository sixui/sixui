import { createTheme, fallbackVar } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import type { IInteraction } from '~/hooks/useInteractions';
import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import type { IListItemVariant } from './ListItem.types';
import { getDensity } from '~/helpers/styles/getDensity';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { FocusRing } from '../FocusRing';
import { Item } from '../Item';
import { PaperBase } from '../PaperBase';
import { StateLayer } from '../StateLayer';
import { cssLayers, themeTokens } from '../ThemeProvider';

type IModifier =
  | IInteraction
  | 'selected'
  | 'disabled'
  | 'with-leading'
  | 'with-trailing'
  | 'with-start-slot'
  | 'with-end-slot';

const DENSITY = px(getDensity({ min: -6, max: 2 }));

const slotTokens = {
  color: {
    normal: {
      regular: 'inherit',
      selected: 'inherit',
    },
    focused: {
      regular: 'inherit',
      selected: 'inherit',
    },
    hovered: {
      regular: 'inherit',
      selected: 'inherit',
    },
    pressed: {
      regular: 'inherit',
      selected: 'inherit',
    },
    disabled: themeTokens.colorScheme.onSurface,
  },
  opacity: {
    disabled: themeTokens.state.opacity.disabled,
  },
};

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  container: {
    leadingSpace: {
      normal: px(space(4)),
      withStartSlot: px(space(2)),
    },
    trailingSpace: {
      normal: px(space(4)),
      withEndSlot: px(space(2)),
    },
    topSpace: calc.add(px(space(2)), DENSITY),
    bottomSpace: calc.add(px(space(2)), DENSITY),
    color: {
      normal: {
        regular: 'inherit',
        selected: 'inherit',
      },
      disabled: 'inherit',
    },
    opacity: {
      disabled: themeTokens.state.containerOpacity.disabled,
    },
    shape: 'unset',
    minHeight: calc.add(px(space(14)), DENSITY),
  },
  nonText: slotTokens,
  text: slotTokens,
  overlineText: slotTokens,
  supportingText: slotTokens,
  trailingSupportingText: slotTokens,
  leadingIcon: {
    color: slotTokens.color,
    size: px(18),
  },
  trailingIcon: {
    color: slotTokens.color,
    size: px(18),
  },
  stateLayer: {
    color: {
      hovered: {
        regular: themeTokens.colorScheme.onSurface,
        selected: themeTokens.colorScheme.onSurface,
      },
      pressed: {
        regular: themeTokens.colorScheme.onSurface,
        selected: themeTokens.colorScheme.onSurface,
      },
    },
    opacity: {
      hovered: {
        regular: themeTokens.state.stateLayerOpacity.hovered,
        selected: themeTokens.state.stateLayerOpacity.hovered,
      },
      pressed: {
        regular: themeTokens.state.stateLayerOpacity.pressed,
        selected: themeTokens.state.stateLayerOpacity.pressed,
      },
    },
  },
  leadingImage: {
    shape: 'unset',
    width: calc.add(px(56), DENSITY),
    height: calc.add(px(56), DENSITY),
  },
  leadingVideo: {
    shape: 'unset',
    height: calc.add(px(64), DENSITY),
  },
});

const classNames = createStyles({
  root: {
    listStyle: 'none',
    borderRadius: tokens.container.shape,
    textAlign: 'start',

    vars: createTokensVars(PaperBase.theme.tokens, {
      container: {
        color: tokens.container.color.normal.regular,
      },
    }),
    selectors: {
      [getModifierSelector<IModifier>('disabled')]: {
        vars: createTokensVars(PaperBase.theme.tokens, {
          container: {
            color: tokens.container.color.disabled,
            opacity: tokens.container.opacity.disabled,
          },
        }),
      },
      [getModifierSelector<IModifier>('selected')]: {
        vars: createTokensVars(PaperBase.theme.tokens, {
          container: {
            color: fallbackVar(
              tokens.container.color.normal.selected,
              tokens.container.color.normal.regular,
            ),
          },
        }),
      },
    },
  },
  focusRing: {
    vars: createTokensVars(FocusRing.theme.tokens, {
      shape: tokens.container.shape,
    }),
  },
  item: ({ root }) => ({
    borderRadius: 'inherit',
    minHeight: tokens.container.minHeight,
    paddingTop: tokens.container.topSpace,
    paddingBottom: tokens.container.bottomSpace,
    paddingInlineStart: tokens.container.leadingSpace.normal,
    paddingInlineEnd: tokens.container.trailingSpace.normal,
    WebkitTapHighlightColor: 'transparent',

    vars: createTokensVars(Item.theme.tokens, {
      nonText: {
        color: fallbackVar(
          tokens.nonText.color.normal.regular,
          tokens.text.color.normal.regular,
        ),
      },
      overline: {
        color: fallbackVar(
          tokens.overlineText.color.normal.regular,
          tokens.text.color.normal.regular,
        ),
      },
      label: {
        color: tokens.text.color.normal.regular,
      },
      supportingText: {
        color: fallbackVar(
          tokens.supportingText.color.normal.regular,
          tokens.text.color.normal.regular,
        ),
      },
      trailingSupportingText: {
        color: fallbackVar(
          tokens.trailingSupportingText.color.normal.regular,
          tokens.text.color.normal.regular,
        ),
      },
    }),

    selectors: {
      [getModifierSelector<IModifier>('with-start-slot', root)]: {
        paddingInlineStart: tokens.container.leadingSpace.withStartSlot,
      },
      [getModifierSelector<IModifier>('with-end-slot', root)]: {
        paddingInlineEnd: tokens.container.trailingSpace.withEndSlot,
      },
      [getModifierSelector<IModifier>('with-leading', root)]: {
        paddingInlineStart: '0px',
      },
      [getModifierSelector<IModifier>('with-trailing', root)]: {
        paddingInlineEnd: '0px',
      },
      [getModifierSelector<IModifier>('selected', root)]: {
        vars: createTokensVars(Item.theme.tokens, {
          nonText: {
            color: fallbackVar(
              tokens.nonText.color.normal.selected,
              tokens.text.color.normal.selected,
            ),
          },
          overline: {
            color: fallbackVar(
              tokens.overlineText.color.normal.selected,
              tokens.text.color.normal.selected,
            ),
          },
          label: {
            color: tokens.text.color.normal.selected,
          },
          supportingText: {
            color: fallbackVar(
              tokens.supportingText.color.normal.selected,
              tokens.text.color.normal.selected,
            ),
          },
          trailingSupportingText: {
            color: fallbackVar(
              tokens.trailingSupportingText.color.normal.regular,
              tokens.text.color.normal.selected,
            ),
          },
        }),
      },
      [getModifierSelector<IModifier>('disabled', root)]: {
        vars: createTokensVars(Item.theme.tokens, {
          nonText: {
            color: fallbackVar(
              tokens.nonText.color.disabled,
              tokens.text.color.disabled,
            ),
            opacity: fallbackVar(
              tokens.nonText.opacity.disabled,
              tokens.text.opacity.disabled,
            ),
          },
          overline: {
            color: fallbackVar(
              tokens.overlineText.color.disabled,
              tokens.text.color.disabled,
            ),
            opacity: fallbackVar(
              tokens.overlineText.opacity.disabled,
              tokens.text.opacity.disabled,
            ),
          },
          label: {
            color: tokens.text.color.disabled,
            opacity: tokens.text.opacity.disabled,
          },
          supportingText: {
            color: fallbackVar(
              tokens.supportingText.color.disabled,
              tokens.text.color.disabled,
            ),
            opacity: fallbackVar(
              tokens.supportingText.opacity.disabled,
              tokens.text.opacity.disabled,
            ),
          },
          trailingSupportingText: {
            color: fallbackVar(
              tokens.trailingSupportingText.color.disabled,
              tokens.text.color.disabled,
            ),
            opacity: fallbackVar(
              tokens.trailingSupportingText.opacity.disabled,
              tokens.text.opacity.disabled,
            ),
          },
        }),
      },

      [getModifierSelector<IModifier>('focused', root)]: {
        vars: createTokensVars(Item.theme.tokens, {
          nonText: {
            color: fallbackVar(
              tokens.nonText.color.focused.regular,
              tokens.nonText.color.normal.regular,
              tokens.text.color.focused.regular,
              tokens.text.color.normal.regular,
            ),
          },
          overline: {
            color: fallbackVar(
              tokens.overlineText.color.focused.regular,
              tokens.overlineText.color.normal.regular,
              tokens.text.color.focused.regular,
              tokens.text.color.normal.regular,
            ),
          },
          label: {
            color: fallbackVar(
              tokens.text.color.focused.regular,
              tokens.text.color.normal.regular,
            ),
          },
          supportingText: {
            color: fallbackVar(
              tokens.supportingText.color.focused.regular,
              tokens.supportingText.color.normal.regular,
              tokens.text.color.focused.regular,
              tokens.text.color.normal.regular,
            ),
          },
          trailingSupportingText: {
            color: fallbackVar(
              tokens.trailingSupportingText.color.focused.regular,
              tokens.trailingSupportingText.color.normal.regular,
              tokens.text.color.focused.regular,
              tokens.text.color.normal.regular,
            ),
          },
        }),
      },
      [getModifierSelector<IModifier>(['focused', 'selected'], root)]: {
        vars: createTokensVars(Item.theme.tokens, {
          nonText: {
            color: fallbackVar(
              tokens.nonText.color.focused.selected,
              tokens.nonText.color.normal.selected,
              tokens.text.color.focused.selected,
              tokens.text.color.normal.selected,
            ),
          },
          overline: {
            color: fallbackVar(
              tokens.overlineText.color.focused.selected,
              tokens.overlineText.color.normal.selected,
              tokens.text.color.focused.selected,
              tokens.text.color.normal.selected,
            ),
          },
          label: {
            color: fallbackVar(
              tokens.text.color.focused.selected,
              tokens.text.color.normal.selected,
            ),
          },
          supportingText: {
            color: fallbackVar(
              tokens.supportingText.color.focused.selected,
              tokens.supportingText.color.normal.selected,
              tokens.text.color.focused.selected,
              tokens.text.color.normal.selected,
            ),
          },
          trailingSupportingText: {
            color: fallbackVar(
              tokens.trailingSupportingText.color.focused.selected,
              tokens.trailingSupportingText.color.normal.selected,
              tokens.text.color.focused.selected,
              tokens.text.color.normal.selected,
            ),
          },
        }),
      },

      [getModifierSelector<IModifier>('hovered', root)]: {
        vars: createTokensVars(Item.theme.tokens, {
          nonText: {
            color: fallbackVar(
              tokens.nonText.color.hovered.regular,
              tokens.nonText.color.normal.regular,
              tokens.text.color.hovered.regular,
              tokens.text.color.normal.regular,
            ),
          },
          overline: {
            color: fallbackVar(
              tokens.overlineText.color.hovered.regular,
              tokens.overlineText.color.normal.regular,
              tokens.text.color.hovered.regular,
              tokens.text.color.normal.regular,
            ),
          },
          label: {
            color: fallbackVar(
              tokens.text.color.hovered.regular,
              tokens.text.color.normal.regular,
            ),
          },
          supportingText: {
            color: fallbackVar(
              tokens.supportingText.color.hovered.regular,
              tokens.supportingText.color.normal.regular,
              tokens.text.color.hovered.regular,
              tokens.text.color.normal.regular,
            ),
          },
          trailingSupportingText: {
            color: fallbackVar(
              tokens.trailingSupportingText.color.hovered.regular,
              tokens.trailingSupportingText.color.normal.regular,
              tokens.text.color.hovered.regular,
              tokens.text.color.normal.regular,
            ),
          },
        }),
      },
      [getModifierSelector<IModifier>(['hovered', 'selected'], root)]: {
        vars: createTokensVars(Item.theme.tokens, {
          nonText: {
            color: fallbackVar(
              tokens.nonText.color.hovered.selected,
              tokens.nonText.color.normal.selected,
              tokens.text.color.hovered.selected,
              tokens.text.color.normal.selected,
            ),
          },
          overline: {
            color: fallbackVar(
              tokens.overlineText.color.hovered.selected,
              tokens.overlineText.color.normal.selected,
              tokens.text.color.hovered.selected,
              tokens.text.color.normal.selected,
            ),
          },
          label: {
            color: fallbackVar(
              tokens.text.color.hovered.selected,
              tokens.text.color.normal.selected,
            ),
          },
          supportingText: {
            color: fallbackVar(
              tokens.supportingText.color.hovered.selected,
              tokens.supportingText.color.normal.selected,
              tokens.text.color.hovered.selected,
              tokens.text.color.normal.selected,
            ),
          },
          trailingSupportingText: {
            color: fallbackVar(
              tokens.trailingSupportingText.color.hovered.selected,
              tokens.trailingSupportingText.color.normal.selected,
              tokens.text.color.hovered.selected,
              tokens.text.color.normal.selected,
            ),
          },
        }),
      },

      [getModifierSelector<IModifier>('pressed', root)]: {
        vars: createTokensVars(Item.theme.tokens, {
          nonText: {
            color: fallbackVar(
              tokens.nonText.color.pressed.regular,
              tokens.nonText.color.normal.regular,
              tokens.text.color.pressed.regular,
              tokens.text.color.normal.regular,
            ),
          },
          overline: {
            color: fallbackVar(
              tokens.overlineText.color.pressed.regular,
              tokens.overlineText.color.normal.regular,
              tokens.text.color.pressed.regular,
              tokens.text.color.normal.regular,
            ),
          },
          label: {
            color: fallbackVar(
              tokens.text.color.pressed.regular,
              tokens.text.color.normal.regular,
            ),
          },
          supportingText: {
            color: fallbackVar(
              tokens.supportingText.color.pressed.regular,
              tokens.supportingText.color.normal.regular,
              tokens.text.color.pressed.regular,
              tokens.text.color.normal.regular,
            ),
          },
          trailingSupportingText: {
            color: fallbackVar(
              tokens.trailingSupportingText.color.pressed.regular,
              tokens.trailingSupportingText.color.normal.regular,
              tokens.text.color.pressed.regular,
              tokens.text.color.normal.regular,
            ),
          },
        }),
      },
      [getModifierSelector<IModifier>(['pressed', 'selected'], root)]: {
        vars: createTokensVars(Item.theme.tokens, {
          nonText: {
            color: fallbackVar(
              tokens.nonText.color.pressed.selected,
              tokens.nonText.color.normal.selected,
              tokens.text.color.pressed.selected,
              tokens.text.color.normal.selected,
            ),
          },
          overline: {
            color: fallbackVar(
              tokens.overlineText.color.pressed.selected,
              tokens.overlineText.color.pressed.selected,
              tokens.text.color.pressed.selected,
              tokens.text.color.normal.selected,
            ),
          },
          label: {
            color: fallbackVar(
              tokens.text.color.pressed.selected,
              tokens.text.color.normal.selected,
            ),
          },
          supportingText: {
            color: fallbackVar(
              tokens.supportingText.color.pressed.selected,
              tokens.supportingText.color.normal.selected,
              tokens.text.color.pressed.selected,
              tokens.text.color.normal.selected,
            ),
          },
          trailingSupportingText: {
            color: fallbackVar(
              tokens.trailingSupportingText.color.pressed.selected,
              tokens.trailingSupportingText.color.normal.selected,
              tokens.text.color.pressed.selected,
              tokens.text.color.normal.selected,
            ),
          },
        }),
      },
    },
  }),
  stateLayer: ({ root }) => ({
    vars: createTokensVars(StateLayer.theme.tokens, {
      color: {
        hovered: tokens.stateLayer.color.hovered.regular,
        pressed: tokens.stateLayer.color.pressed.regular,
      },
      opacity: {
        hovered: tokens.stateLayer.opacity.hovered.regular,
        pressed: tokens.stateLayer.opacity.pressed.regular,
      },
    }),

    selectors: {
      [getModifierSelector<IModifier>('selected', root)]: {
        vars: createTokensVars(StateLayer.theme.tokens, {
          color: {
            hovered: tokens.stateLayer.color.hovered.selected,
            pressed: tokens.stateLayer.color.pressed.selected,
          },
          opacity: {
            hovered: tokens.stateLayer.opacity.hovered.selected,
            pressed: tokens.stateLayer.opacity.pressed.selected,
          },
        }),
      },
    },
  }),
  icon: {
    display: 'flex',
  },
  icon$leading: ({ root }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: fallbackVar(
      tokens.leadingIcon.color.normal.regular,
      tokens.nonText.color.normal.regular,
    ),
    fontSize: tokens.leadingIcon.size,
    inlineSize: tokens.leadingIcon.size,
    blockSize: tokens.leadingIcon.size,

    selectors: {
      [getModifierSelector<IModifier>('disabled', root)]: {
        color: fallbackVar(
          tokens.leadingIcon.color.disabled,
          tokens.nonText.color.disabled,
        ),
      },

      [getModifierSelector<IModifier>('selected', root)]: {
        color: fallbackVar(
          tokens.leadingIcon.color.normal.selected,
          tokens.nonText.color.normal.selected,
        ),
      },

      [getModifierSelector<IModifier>('focused', root)]: {
        color: fallbackVar(
          tokens.leadingIcon.color.focused.regular,
          tokens.leadingIcon.color.normal.regular,
          tokens.nonText.color.focused.regular,
          tokens.nonText.color.normal.regular,
        ),
      },
      [getModifierSelector<IModifier>(['focused', 'selected'], root)]: {
        color: fallbackVar(
          tokens.leadingIcon.color.focused.selected,
          tokens.leadingIcon.color.normal.selected,
          tokens.nonText.color.focused.selected,
          tokens.nonText.color.normal.selected,
        ),
      },

      [getModifierSelector<IModifier>('hovered', root)]: {
        color: fallbackVar(
          tokens.leadingIcon.color.hovered.regular,
          tokens.leadingIcon.color.normal.regular,
          tokens.nonText.color.hovered.regular,
          tokens.nonText.color.normal.regular,
        ),
      },
      [getModifierSelector<IModifier>(['hovered', 'selected'], root)]: {
        color: fallbackVar(
          tokens.leadingIcon.color.hovered.selected,
          tokens.leadingIcon.color.normal.selected,
          tokens.nonText.color.hovered.selected,
          tokens.nonText.color.normal.selected,
        ),
      },

      [getModifierSelector<IModifier>('pressed', root)]: {
        color: fallbackVar(
          tokens.leadingIcon.color.pressed.regular,
          tokens.leadingIcon.color.normal.regular,
          tokens.nonText.color.pressed.regular,
          tokens.nonText.color.normal.regular,
        ),
      },
      [getModifierSelector<IModifier>(['pressed', 'selected'], root)]: {
        color: fallbackVar(
          tokens.leadingIcon.color.pressed.selected,
          tokens.leadingIcon.color.normal.selected,
          tokens.nonText.color.pressed.selected,
          tokens.nonText.color.normal.selected,
        ),
      },
    },
  }),
  icon$trailing: ({ root }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: fallbackVar(
      tokens.trailingIcon.color.normal.regular,
      tokens.nonText.color.normal.regular,
    ),
    fontSize: tokens.trailingIcon.size,
    inlineSize: tokens.trailingIcon.size,
    blockSize: tokens.trailingIcon.size,

    selectors: {
      [getModifierSelector<IModifier>('disabled', root)]: {
        color: fallbackVar(
          tokens.trailingIcon.color.disabled,
          tokens.nonText.color.disabled,
        ),
      },

      [getModifierSelector<IModifier>('selected', root)]: {
        color: fallbackVar(
          tokens.trailingIcon.color.normal.selected,
          tokens.nonText.color.normal.selected,
        ),
      },

      [getModifierSelector<IModifier>('focused', root)]: {
        color: fallbackVar(
          tokens.trailingIcon.color.focused.regular,
          tokens.trailingIcon.color.normal.regular,
          tokens.nonText.color.focused.regular,
          tokens.nonText.color.normal.regular,
        ),
      },
      [getModifierSelector<IModifier>(['focused', 'selected'], root)]: {
        color: fallbackVar(
          tokens.trailingIcon.color.focused.selected,
          tokens.trailingIcon.color.normal.selected,
          tokens.nonText.color.focused.selected,
          tokens.nonText.color.normal.selected,
        ),
      },

      [getModifierSelector<IModifier>('hovered', root)]: {
        color: fallbackVar(
          tokens.trailingIcon.color.hovered.regular,
          tokens.trailingIcon.color.normal.regular,
          tokens.nonText.color.hovered.regular,
          tokens.nonText.color.normal.regular,
        ),
      },
      [getModifierSelector<IModifier>(['hovered', 'selected'], root)]: {
        color: fallbackVar(
          tokens.trailingIcon.color.hovered.selected,
          tokens.trailingIcon.color.normal.selected,
          tokens.nonText.color.hovered.selected,
          tokens.nonText.color.normal.selected,
        ),
      },

      [getModifierSelector<IModifier>('pressed', root)]: {
        color: fallbackVar(
          tokens.trailingIcon.color.pressed.regular,
          tokens.trailingIcon.color.normal.regular,
          tokens.nonText.color.pressed.regular,
          tokens.nonText.color.normal.regular,
        ),
      },
      [getModifierSelector<IModifier>(['pressed', 'selected'], root)]: {
        color: fallbackVar(
          tokens.trailingIcon.color.pressed.selected,
          tokens.trailingIcon.color.normal.selected,
          tokens.nonText.color.pressed.selected,
          tokens.nonText.color.normal.selected,
        ),
      },
    },
  }),
  image: {
    borderRadius: tokens.leadingImage.shape,
    width: tokens.leadingImage.width,
    height: tokens.leadingImage.height,
    backgroundSize: 'cover',
  },
  video: {
    borderRadius: tokens.leadingVideo.shape,
    height: tokens.leadingVideo.height,
    objectFit: 'cover',
  },
});

export type IListItemThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
  variant: IListItemVariant;
}>;

export const listItemTheme = componentThemeFactory<IListItemThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});

export const listItemVariants = {
  standard: createStyles({
    root: {
      vars: createTokensVars(tokens, {
        container: {
          color: {
            normal: {
              selected: themeTokens.colorScheme.primaryContainer,
            },
          },
        },
        nonText: {
          color: {
            normal: {
              regular: themeTokens.colorScheme.onSurfaceVariant,
              selected: themeTokens.colorScheme.onPrimaryContainer,
            },
          },
        },
        text: {
          color: {
            normal: {
              regular: themeTokens.colorScheme.onSurface,
              selected: themeTokens.colorScheme.onPrimaryContainer,
            },
          },
        },
        stateLayer: {
          color: {
            pressed: {
              regular: themeTokens.colorScheme.primary,
              selected: themeTokens.colorScheme.primary,
            },
          },
        },
      }),
    },
  }),
  danger: createStyles({
    root: {
      vars: createTokensVars(tokens, {
        container: {
          color: {
            normal: {
              selected: themeTokens.colorScheme.errorContainer,
            },
          },
        },
        nonText: {
          color: {
            normal: {
              regular: themeTokens.colorScheme.error,
              selected: themeTokens.colorScheme.error,
            },
            hovered: {
              regular: themeTokens.colorScheme.onError,
              selected: themeTokens.colorScheme.onError,
            },
            pressed: {
              regular: themeTokens.colorScheme.onError,
              selected: themeTokens.colorScheme.onError,
            },
          },
        },
        text: {
          color: {
            normal: {
              regular: themeTokens.colorScheme.error,
              selected: themeTokens.colorScheme.error,
            },
            hovered: {
              regular: themeTokens.colorScheme.onError,
              selected: themeTokens.colorScheme.onError,
            },
            pressed: {
              regular: themeTokens.colorScheme.onError,
              selected: themeTokens.colorScheme.onError,
            },
          },
        },
        stateLayer: {
          color: {
            hovered: {
              regular: themeTokens.colorScheme.error,
              selected: themeTokens.colorScheme.error,
            },
            pressed: {
              regular: themeTokens.colorScheme.error,
              selected: themeTokens.colorScheme.error,
            },
          },
          opacity: {
            hovered: {
              regular: '0.87',
              selected: '0.87',
            },
            pressed: {
              regular: '1',
              selected: '1',
            },
          },
        },
      }),
    },
  }),
};
