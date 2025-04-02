import { fallbackVar } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { Item } from '~/components/Item';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { density } from '~/utils/css/density';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { px } from '~/utils/css/px';
import { space } from '~/utils/css/space';
import { themeTokens } from '~/components/Theme/theme.css';
import { COMPONENT_NAME } from './ListItem.constants';

type IModifier =
  | 'selected'
  | 'active'
  | 'disabled'
  | 'with-leading'
  | 'with-trailing'
  | 'with-start-slot'
  | 'with-end-slot';

const DENSITY = px(density({ min: -6, max: 2 }));

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  container: {
    color: {
      normal: {
        regular: 'inherit',
        active: `color-mix(in srgb, ${themeTokens.colorScheme.onSurface} calc(${
          themeTokens.state.stateLayerOpacity.hovered
        } * 100%), transparent)`,
        selected: themeTokens.colorScheme.primaryContainer,
      },
    },
    shape: 'unset',
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
    minHeight: calc.add(px(56), DENSITY),
  },
  nonText: {
    color: {
      normal: themeTokens.colorScheme.onSurfaceVariant,
      selected: themeTokens.colorScheme.onPrimaryContainer,
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
  },
  text: {
    color: {
      normal: themeTokens.colorScheme.onSurfaceVariant,
      selected: themeTokens.colorScheme.onPrimaryContainer,
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
  },
  overlineText: {
    color: {
      normal: themeTokens.colorScheme.onSurfaceVariant,
      selected: themeTokens.colorScheme.onPrimaryContainer,
    },
  },
  supportingText: {
    color: {
      normal: themeTokens.colorScheme.onSurfaceVariant,
      selected: themeTokens.colorScheme.onPrimaryContainer,
    },
  },
  trailingSupportingText: {
    color: {
      normal: themeTokens.colorScheme.onSurfaceVariant,
      selected: themeTokens.colorScheme.onPrimaryContainer,
    },
  },
  leadingIcon: {
    color: {
      normal: 'inherit',
      selected: 'inherit',
      disabled: 'inherit',
    },
    size: px(18),
  },
  trailingIcon: {
    color: {
      normal: 'inherit',
      selected: 'inherit',
      disabled: 'inherit',
    },
    size: px(18),
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
    backgroundColor: tokens.container.color.normal.regular,
    minHeight: tokens.container.minHeight,
    paddingTop: tokens.container.topSpace,
    paddingBottom: tokens.container.bottomSpace,
    paddingInlineStart: tokens.container.leadingSpace.normal,
    paddingInlineEnd: tokens.container.trailingSpace.normal,

    vars: overrideTokens(Item.theme.tokens, {
      nonText: {
        color: fallbackVar(
          tokens.nonText.color.normal,
          tokens.text.color.normal,
        ),
      },
      overline: {
        color: fallbackVar(
          tokens.overlineText.color.normal,
          tokens.text.color.normal,
        ),
      },
      label: {
        color: tokens.text.color.normal,
      },
      supportingText: {
        color: fallbackVar(
          tokens.supportingText.color.normal,
          tokens.text.color.normal,
        ),
      },
      trailingSupportingText: {
        color: fallbackVar(
          tokens.trailingSupportingText.color.normal,
          tokens.text.color.normal,
        ),
      },
    }),

    selectors: {
      [modifierSelector<IModifier>('with-start-slot')]: {
        paddingInlineStart: tokens.container.leadingSpace.withStart,
      },
      [modifierSelector<IModifier>('with-end-slot')]: {
        paddingInlineEnd: tokens.container.trailingSpace.withEnd,
      },
      [modifierSelector<IModifier>('with-leading')]: {
        paddingInlineStart: px(0),
      },
      [modifierSelector<IModifier>('with-trailing')]: {
        paddingInlineEnd: px(0),
      },
      [modifierSelector<IModifier>('active')]: {
        backgroundColor: tokens.container.color.normal.active,
      },
      [modifierSelector<IModifier>('selected')]: {
        backgroundColor: tokens.container.color.normal.selected,
        vars: overrideTokens(Item.theme.tokens, {
          nonText: {
            color: fallbackVar(
              tokens.nonText.color.selected,
              tokens.text.color.selected,
            ),
          },
          overline: {
            color: fallbackVar(
              tokens.overlineText.color.selected,
              tokens.text.color.selected,
            ),
          },
          label: {
            color: tokens.text.color.selected,
          },
          supportingText: {
            color: fallbackVar(
              tokens.supportingText.color.selected,
              tokens.text.color.selected,
            ),
          },
          trailingSupportingText: {
            color: fallbackVar(
              tokens.trailingSupportingText.color.selected,
              tokens.text.color.selected,
            ),
          },
        }),
      },
      [modifierSelector<IModifier>('disabled')]: {
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
            color: tokens.text.color.disabled,
            opacity: tokens.text.opacity.disabled,
          },
          label: {
            color: tokens.text.color.disabled,
            opacity: tokens.text.opacity.disabled,
          },
          supportingText: {
            color: tokens.text.color.disabled,
            opacity: tokens.text.opacity.disabled,
          },
          trailingSupportingText: {
            color: tokens.text.color.disabled,
            opacity: tokens.text.opacity.disabled,
          },
        }),
      },
    },
  },
  root$hoverable: {
    ':hover': {
      backgroundColor: tokens.container.color.normal.active,
      cursor: 'pointer',
    },
  },
  icon: {
    display: 'flex',
  },
  icon$leading: ({ root }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: fallbackVar(
      tokens.leadingIcon.color.normal,
      tokens.nonText.color.normal,
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
          tokens.leadingIcon.color.selected,
          tokens.nonText.color.selected,
        ),
      },
    },
  }),
  icon$trailing: ({ root }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: fallbackVar(
      tokens.trailingIcon.color.normal,
      tokens.nonText.color.normal,
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
          tokens.trailingIcon.color.selected,
          tokens.nonText.color.selected,
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
}>;

export const listItemTheme = componentThemeFactory<IListItemThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
