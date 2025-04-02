import { fallbackVar } from '@vanilla-extract/css';

import type { IInteraction } from '~/hooks/useInteractions';
import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import type { IListItemButtonVariant } from './ListItemButton.types';
import { ButtonBase } from '~/components/ButtonBase';
import { PaperBase } from '~/components/PaperBase';
import { StateLayer } from '~/components/StateLayer';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { themeTokens } from '~/components/Theme/theme.css';
import { ListItem } from '../ListItem';
import { COMPONENT_NAME } from './ListItemButton.constants';

type IModifier = IInteraction | 'selected' | 'disabled';

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
    shape: 'inherit',
    color: {
      normal: 'unset',
      selected: 'unset',
    },
  },
  nonText: slotTokens,
  text: slotTokens,
  overlineText: slotTokens,
  supportingText: slotTokens,
  trailingSupportingText: slotTokens,
  stateLayer: {
    color: {
      hovered: {
        normal: themeTokens.colorScheme.onSurface,
        selected: themeTokens.colorScheme.onSurface,
      },
      pressed: {
        normal: themeTokens.colorScheme.onSurface,
        selected: themeTokens.colorScheme.onSurface,
      },
    },
    opacity: {
      hovered: {
        normal: themeTokens.state.stateLayerOpacity.hovered,
        selected: themeTokens.state.stateLayerOpacity.hovered,
      },
      pressed: {
        normal: themeTokens.state.stateLayerOpacity.pressed,
        selected: themeTokens.state.stateLayerOpacity.pressed,
      },
    },
  },
});

const classNames = createStyles({
  root: {
    WebkitTapHighlightColor: 'transparent',

    vars: {
      ...overrideTokens(PaperBase.theme.tokens, {
        container: {
          color: tokens.container.color.normal,
        },
      }),
      ...overrideTokens(ButtonBase.theme.tokens, {
        container: {
          shape: tokens.container.shape,
        },
      }),
    },
  },
  listItem: ({ root }) => ({
    vars: overrideTokens(ListItem.theme.tokens, {
      container: {
        shape: tokens.container.shape,
      },
      nonText: {
        color: {
          normal: tokens.nonText.color.normal.regular,
          selected: tokens.nonText.color.normal.selected,
        },
      },
      text: {
        color: {
          normal: tokens.text.color.normal.regular,
          selected: tokens.text.color.normal.selected,
        },
      },
      overlineText: {
        color: {
          normal: tokens.overlineText.color.normal.regular,
          selected: tokens.overlineText.color.normal.selected,
        },
      },
      supportingText: {
        color: {
          normal: tokens.supportingText.color.normal.regular,
          selected: tokens.supportingText.color.normal.selected,
        },
      },
      trailingSupportingText: {
        color: {
          normal: tokens.trailingSupportingText.color.normal.regular,
          selected: tokens.trailingSupportingText.color.normal.selected,
        },
      },
    }),

    selectors: {
      [modifierSelector<IModifier>('focused', root)]: {
        vars: overrideTokens(ListItem.theme.tokens, {
          nonText: {
            color: {
              normal: fallbackVar(
                tokens.nonText.color.focused.regular,
                tokens.nonText.color.normal.regular,
              ),
              selected: fallbackVar(
                tokens.nonText.color.focused.selected,
                tokens.nonText.color.normal.selected,
              ),
            },
          },
          text: {
            color: {
              normal: fallbackVar(
                tokens.text.color.focused.regular,
                tokens.text.color.normal.regular,
              ),
              selected: fallbackVar(
                tokens.text.color.focused.selected,
                tokens.text.color.normal.selected,
              ),
            },
          },
          overlineText: {
            color: {
              normal: fallbackVar(
                tokens.overlineText.color.focused.regular,
                tokens.overlineText.color.normal.regular,
              ),
              selected: fallbackVar(
                tokens.overlineText.color.focused.selected,
                tokens.overlineText.color.normal.selected,
              ),
            },
          },
          supportingText: {
            color: {
              normal: fallbackVar(
                tokens.supportingText.color.focused.regular,
                tokens.supportingText.color.normal.regular,
              ),
              selected: fallbackVar(
                tokens.supportingText.color.focused.selected,
                tokens.supportingText.color.normal.selected,
              ),
            },
          },
          trailingSupportingText: {
            color: {
              normal: fallbackVar(
                tokens.trailingSupportingText.color.focused.regular,
                tokens.trailingSupportingText.color.normal.regular,
              ),
              selected: fallbackVar(
                tokens.trailingSupportingText.color.focused.selected,
                tokens.trailingSupportingText.color.normal.selected,
              ),
            },
          },
        }),
      },
      [modifierSelector<IModifier>('hovered', root)]: {
        vars: overrideTokens(ListItem.theme.tokens, {
          nonText: {
            color: {
              normal: fallbackVar(
                tokens.nonText.color.hovered.regular,
                tokens.nonText.color.normal.regular,
              ),
              selected: fallbackVar(
                tokens.nonText.color.hovered.selected,
                tokens.nonText.color.normal.selected,
              ),
            },
          },
          text: {
            color: {
              normal: fallbackVar(
                tokens.text.color.hovered.regular,
                tokens.text.color.normal.regular,
              ),
              selected: fallbackVar(
                tokens.text.color.hovered.selected,
                tokens.text.color.normal.selected,
              ),
            },
          },
        }),
      },
      [modifierSelector<IModifier>('pressed', root)]: {
        vars: overrideTokens(ListItem.theme.tokens, {
          nonText: {
            color: {
              normal: fallbackVar(
                tokens.nonText.color.pressed.regular,
                tokens.nonText.color.normal.regular,
              ),
              selected: fallbackVar(
                tokens.nonText.color.pressed.selected,
                tokens.nonText.color.normal.selected,
              ),
            },
          },
          text: {
            color: {
              normal: fallbackVar(
                tokens.text.color.pressed.regular,
                tokens.text.color.normal.regular,
              ),
              selected: fallbackVar(
                tokens.text.color.pressed.selected,
                tokens.text.color.normal.selected,
              ),
            },
          },
        }),
      },
    },
  }),
  stateLayer: ({ root }) => ({
    vars: overrideTokens(StateLayer.theme.tokens, {
      color: {
        hovered: tokens.stateLayer.color.hovered.normal,
        pressed: tokens.stateLayer.color.pressed.normal,
      },
      opacity: {
        hovered: tokens.stateLayer.opacity.hovered.normal,
        pressed: tokens.stateLayer.opacity.pressed.normal,
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
});

export type IListItemButtonThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
  variant: IListItemButtonVariant;
}>;

export const listItemButtonTheme =
  componentThemeFactory<IListItemButtonThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });

export const listItemButtonThemeVariants = {
  standard: createStyles(),
  danger: createStyles({
    root: {
      vars: overrideTokens(tokens, {
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
              normal: themeTokens.colorScheme.error,
              selected: themeTokens.colorScheme.error,
            },
            pressed: {
              normal: themeTokens.colorScheme.error,
              selected: themeTokens.colorScheme.error,
            },
          },
          opacity: {
            hovered: {
              normal: '0.87',
              selected: '0.87',
            },
            pressed: {
              normal: '1',
              selected: '1',
            },
          },
        },
      }),
    },
    item: {
      vars: overrideTokens(ListItem.theme.tokens, {
        container: {
          color: {
            normal: {
              selected: themeTokens.colorScheme.errorContainer,
            },
          },
        },
      }),
    },
  }),
};
