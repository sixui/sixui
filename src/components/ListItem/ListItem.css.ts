import { createTheme, fallbackVar } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import type { IInteraction } from '~/hooks/useInteractions';
import type { IListItemVariant } from './ListItem.types';
import {
  componentThemeFactory,
  type IComponentThemeFactory,
} from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { space } from '~/helpers/styles/space';
import { getDensity } from '~/helpers/styles/getDensity';
import { px } from '~/helpers/styles/px';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { themeTokens } from '../ThemeProvider';
import { Item } from '../Item';
import { PaperBase } from '../PaperBase';
import { StateLayer } from '../StateLayer';

type IModifier =
  | IInteraction
  | 'selected'
  | 'disabled'
  | 'with-leading'
  | 'with-trailing';

const DENSITY = px(getDensity({ min: -4, max: 2 }));

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
  leadingSpace: px(space(4)),
  trailingSpace: px(space(4)),
  topSpace: calc.add(px(space(2)), DENSITY),
  bottomSpace: calc.add(px(space(2)), DENSITY),
  container: {
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
    width: calc.add(px(56), DENSITY),
    height: calc.add(px(56), DENSITY),
  },
  leadingVideo: {
    height: calc.add(px(64), DENSITY),
  },
});

const classNames = createStyles({
  root: {
    vars: createTokensVars(PaperBase.theme.tokens, {
      container: {
        color: {
          normal: tokens.container.color.normal.regular,
          disabled: tokens.container.color.disabled,
        },
        opacity: {
          disabled: tokens.container.opacity.disabled,
        },
      },
    }),

    listStyle: 'none',
    borderRadius: tokens.container.shape,
    textAlign: 'start',

    selectors: {
      [getModifierSelector<IModifier>('selected')]: {
        vars: createTokensVars(PaperBase.theme.tokens, {
          container: {
            color: {
              normal: fallbackVar(
                tokens.container.color.normal.selected,
                tokens.container.color.normal.regular,
              ),
            },
          },
        }),
      },
    },
  },
  item: ({ root }) => ({
    vars: createTokensVars(Item.theme.tokens, {
      nonText: {
        color: fallbackVar(
          tokens.nonText.color.normal.regular,
          tokens.text.color.normal.regular,
        ),
      },
      overlineText: {
        color: fallbackVar(
          tokens.overlineText.color.normal.regular,
          tokens.text.color.normal.regular,
        ),
      },
      headlineText: {
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

    borderRadius: 'inherit',
    minHeight: tokens.container.minHeight,
    paddingTop: tokens.topSpace,
    paddingBottom: tokens.bottomSpace,
    paddingInlineStart: tokens.leadingSpace,
    paddingInlineEnd: tokens.trailingSpace,
    WebkitTapHighlightColor: 'transparent',

    selectors: {
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
          overlineText: {
            color: fallbackVar(
              tokens.overlineText.color.normal.selected,
              tokens.text.color.normal.selected,
            ),
          },
          headlineText: {
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
          overlineText: {
            color: fallbackVar(
              tokens.overlineText.color.disabled,
              tokens.text.color.disabled,
            ),
            opacity: fallbackVar(
              tokens.overlineText.opacity.disabled,
              tokens.text.opacity.disabled,
            ),
          },
          headlineText: {
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
          overlineText: {
            color: fallbackVar(
              tokens.overlineText.color.focused.regular,
              tokens.overlineText.color.normal.regular,
              tokens.text.color.focused.regular,
              tokens.text.color.normal.regular,
            ),
          },
          headlineText: {
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
          overlineText: {
            color: fallbackVar(
              tokens.overlineText.color.focused.selected,
              tokens.overlineText.color.normal.selected,
              tokens.text.color.focused.selected,
              tokens.text.color.normal.selected,
            ),
          },
          headlineText: {
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
          overlineText: {
            color: fallbackVar(
              tokens.overlineText.color.hovered.regular,
              tokens.overlineText.color.normal.regular,
              tokens.text.color.hovered.regular,
              tokens.text.color.normal.regular,
            ),
          },
          headlineText: {
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
          overlineText: {
            color: fallbackVar(
              tokens.overlineText.color.hovered.selected,
              tokens.overlineText.color.normal.selected,
              tokens.text.color.hovered.selected,
              tokens.text.color.normal.selected,
            ),
          },
          headlineText: {
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
          overlineText: {
            color: fallbackVar(
              tokens.overlineText.color.pressed.regular,
              tokens.overlineText.color.normal.regular,
              tokens.text.color.pressed.regular,
              tokens.text.color.normal.regular,
            ),
          },
          headlineText: {
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
          overlineText: {
            color: fallbackVar(
              tokens.overlineText.color.pressed.selected,
              tokens.overlineText.color.pressed.selected,
              tokens.text.color.pressed.selected,
              tokens.text.color.normal.selected,
            ),
          },
          headlineText: {
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
    color: fallbackVar(
      tokens.leadingIcon.color.normal.regular,
      tokens.nonText.color.normal.regular,
    ),
    fontSize: tokens.leadingIcon.size,
    inlineSize: tokens.leadingIcon.size,
    blockSize: tokens.leadingIcon.size,
    textAlign: 'center',

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
    color: fallbackVar(
      tokens.trailingIcon.color.normal.regular,
      tokens.nonText.color.normal.regular,
    ),
    fontSize: tokens.trailingIcon.size,
    inlineSize: tokens.trailingIcon.size,
    blockSize: tokens.trailingIcon.size,
    textAlign: 'center',

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
    width: tokens.leadingImage.width,
    height: tokens.leadingImage.height,
    backgroundSize: 'cover',
  },
  video: {
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
