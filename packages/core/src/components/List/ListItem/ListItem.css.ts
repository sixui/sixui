import { fallbackVar } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import type { IInteraction } from '~/hooks/useInteractions';
import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import type { IListItemVariant } from './ListItem.types';
import { ButtonBase } from '~/components/ButtonBase';
import { Item } from '~/components/Item';
import { PaperBase } from '~/components/PaperBase';
import { StateLayer } from '~/components/StateLayer';
import { themeTokens } from '~/components/Theme';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { density } from '~/utils/css/density';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { px } from '~/utils/css/px';
import { space } from '~/utils/css/space';
import { COMPONENT_NAME } from './ListItem.constants';

type IModifier =
  | IInteraction
  | 'selected'
  | 'disabled'
  | 'with-leading'
  | 'with-trailing'
  | 'with-start-slot'
  | 'with-end-slot';

const DENSITY = px(density({ min: -6, max: 2 }));

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

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  container: {
    leadingSpace: {
      normal: px(space('$lg')),
      withStart: px(space('$lg')),
    },
    trailingSpace: {
      normal: px(space('$lg')),
      withEnd: px(space('$lg')),
    },
    topSpace: `max(0, ${calc.add(px(space('$sm')), DENSITY)})`,
    bottomSpace: `max(0, ${calc.add(px(space('$sm')), DENSITY)})`,
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
    minHeight: calc.add(px(56), DENSITY),
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

    vars: {
      ...overrideTokens(ButtonBase.theme.tokens, {
        container: {
          shape: tokens.container.shape,
        },
      }),
      ...overrideTokens(PaperBase.theme.tokens, {
        container: {
          color: tokens.container.color.normal.regular,
        },
      }),
    },
    selectors: {
      [modifierSelector<IModifier>('disabled')]: {
        vars: overrideTokens(PaperBase.theme.tokens, {
          container: {
            color: tokens.container.color.disabled,
            opacity: tokens.container.opacity.disabled,
          },
        }),
      },
      [modifierSelector<IModifier>('selected')]: {
        vars: overrideTokens(PaperBase.theme.tokens, {
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
  item: ({ root }) => ({
    borderRadius: 'inherit',
    minHeight: tokens.container.minHeight,
    paddingTop: tokens.container.topSpace,
    paddingBottom: tokens.container.bottomSpace,
    paddingInlineStart: tokens.container.leadingSpace.normal,
    paddingInlineEnd: tokens.container.trailingSpace.normal,
    WebkitTapHighlightColor: 'transparent',

    vars: overrideTokens(Item.theme.tokens, {
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
      [modifierSelector<IModifier>('with-start-slot', root)]: {
        paddingInlineStart: tokens.container.leadingSpace.withStart,
      },
      [modifierSelector<IModifier>('with-end-slot', root)]: {
        paddingInlineEnd: tokens.container.trailingSpace.withEnd,
      },
      [modifierSelector<IModifier>('with-leading', root)]: {
        paddingInlineStart: px(0),
      },
      [modifierSelector<IModifier>('with-trailing', root)]: {
        paddingInlineEnd: px(0),
      },
      [modifierSelector<IModifier>('selected', root)]: {
        vars: overrideTokens(Item.theme.tokens, {
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
      [modifierSelector<IModifier>('disabled', root)]: {
        vars: overrideTokens(Item.theme.tokens, {
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

      [modifierSelector<IModifier>('focused', root)]: {
        vars: overrideTokens(Item.theme.tokens, {
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
      [modifierSelector<IModifier>(['focused', 'selected'], root)]: {
        vars: overrideTokens(Item.theme.tokens, {
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

      [modifierSelector<IModifier>('hovered', root)]: {
        vars: overrideTokens(Item.theme.tokens, {
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
      [modifierSelector<IModifier>(['hovered', 'selected'], root)]: {
        vars: overrideTokens(Item.theme.tokens, {
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

      [modifierSelector<IModifier>('pressed', root)]: {
        vars: overrideTokens(Item.theme.tokens, {
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
      [modifierSelector<IModifier>(['pressed', 'selected'], root)]: {
        vars: overrideTokens(Item.theme.tokens, {
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
    vars: overrideTokens(StateLayer.theme.tokens, {
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
      [modifierSelector<IModifier>('selected', root)]: {
        vars: overrideTokens(StateLayer.theme.tokens, {
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
      [modifierSelector<IModifier>('disabled', root)]: {
        color: fallbackVar(
          tokens.leadingIcon.color.disabled,
          tokens.nonText.color.disabled,
        ),
      },

      [modifierSelector<IModifier>('selected', root)]: {
        color: fallbackVar(
          tokens.leadingIcon.color.normal.selected,
          tokens.nonText.color.normal.selected,
        ),
      },

      [modifierSelector<IModifier>('focused', root)]: {
        color: fallbackVar(
          tokens.leadingIcon.color.focused.regular,
          tokens.leadingIcon.color.normal.regular,
          tokens.nonText.color.focused.regular,
          tokens.nonText.color.normal.regular,
        ),
      },
      [modifierSelector<IModifier>(['focused', 'selected'], root)]: {
        color: fallbackVar(
          tokens.leadingIcon.color.focused.selected,
          tokens.leadingIcon.color.normal.selected,
          tokens.nonText.color.focused.selected,
          tokens.nonText.color.normal.selected,
        ),
      },

      [modifierSelector<IModifier>('hovered', root)]: {
        color: fallbackVar(
          tokens.leadingIcon.color.hovered.regular,
          tokens.leadingIcon.color.normal.regular,
          tokens.nonText.color.hovered.regular,
          tokens.nonText.color.normal.regular,
        ),
      },
      [modifierSelector<IModifier>(['hovered', 'selected'], root)]: {
        color: fallbackVar(
          tokens.leadingIcon.color.hovered.selected,
          tokens.leadingIcon.color.normal.selected,
          tokens.nonText.color.hovered.selected,
          tokens.nonText.color.normal.selected,
        ),
      },

      [modifierSelector<IModifier>('pressed', root)]: {
        color: fallbackVar(
          tokens.leadingIcon.color.pressed.regular,
          tokens.leadingIcon.color.normal.regular,
          tokens.nonText.color.pressed.regular,
          tokens.nonText.color.normal.regular,
        ),
      },
      [modifierSelector<IModifier>(['pressed', 'selected'], root)]: {
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
      [modifierSelector<IModifier>('disabled', root)]: {
        color: fallbackVar(
          tokens.trailingIcon.color.disabled,
          tokens.nonText.color.disabled,
        ),
      },

      [modifierSelector<IModifier>('selected', root)]: {
        color: fallbackVar(
          tokens.trailingIcon.color.normal.selected,
          tokens.nonText.color.normal.selected,
        ),
      },

      [modifierSelector<IModifier>('focused', root)]: {
        color: fallbackVar(
          tokens.trailingIcon.color.focused.regular,
          tokens.trailingIcon.color.normal.regular,
          tokens.nonText.color.focused.regular,
          tokens.nonText.color.normal.regular,
        ),
      },
      [modifierSelector<IModifier>(['focused', 'selected'], root)]: {
        color: fallbackVar(
          tokens.trailingIcon.color.focused.selected,
          tokens.trailingIcon.color.normal.selected,
          tokens.nonText.color.focused.selected,
          tokens.nonText.color.normal.selected,
        ),
      },

      [modifierSelector<IModifier>('hovered', root)]: {
        color: fallbackVar(
          tokens.trailingIcon.color.hovered.regular,
          tokens.trailingIcon.color.normal.regular,
          tokens.nonText.color.hovered.regular,
          tokens.nonText.color.normal.regular,
        ),
      },
      [modifierSelector<IModifier>(['hovered', 'selected'], root)]: {
        color: fallbackVar(
          tokens.trailingIcon.color.hovered.selected,
          tokens.trailingIcon.color.normal.selected,
          tokens.nonText.color.hovered.selected,
          tokens.nonText.color.normal.selected,
        ),
      },

      [modifierSelector<IModifier>('pressed', root)]: {
        color: fallbackVar(
          tokens.trailingIcon.color.pressed.regular,
          tokens.trailingIcon.color.normal.regular,
          tokens.nonText.color.pressed.regular,
          tokens.nonText.color.normal.regular,
        ),
      },
      [modifierSelector<IModifier>(['pressed', 'selected'], root)]: {
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

export const listItemThemeVariants = {
  standard: createStyles({
    root: {
      vars: overrideTokens(tokens, {
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
      vars: overrideTokens(tokens, {
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
