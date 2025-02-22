import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { Avatar } from '~/components/Avatar';
import { PaperBase } from '~/components/PaperBase';
import { StateLayer } from '~/components/StateLayer';
import { themeTokens } from '~/components/Theme';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { density, space, typography } from '~/utils/css';
import { createStyles } from '~/utils/css/createStyles';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { px } from '~/utils/css/px';
import { elevationLevelPreset } from '~/components/Elevation/Elevation.css';
import { COMPONENT_NAME } from './SearchBar.constants';

const DENSITY = px(density({ min: -3, max: 0 }));

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  container: {
    color: themeTokens.colorScheme.surfaceContainerHigh,
    elevation: elevationLevelPreset[0],
    shape: themeTokens.shape.corner.full,
    height: calc.add(px(56), DENSITY),
    leadingSpace: px(space(4)),
    trailingSpace: px(space(4)),
    gap: px(space(4)),
    trailingSlotGap: px(space(2)),
  },
  leadingIcon: {
    color: themeTokens.colorScheme.onSurface,
    size: px(18),
  },
  trailingIcon: {
    color: themeTokens.colorScheme.onSurfaceVariant,
    size: px(18),
  },
  avatar: {
    shape: themeTokens.shape.corner.full,
    size: px(30),
  },
  placeholder: {
    color: themeTokens.colorScheme.onSurfaceVariant,
    typography: themeTokens.typeScale.body.lg,
  },
  inputText: {
    color: themeTokens.colorScheme.onSurface,
    typography: themeTokens.typeScale.body.lg,
  },
  stateLayer: {
    hovered: themeTokens.colorScheme.onSurface,
    pressed: 'none',
  },
  caret: {
    color: themeTokens.colorScheme.primary,
  },
  selection: {
    color: 'inherit',
    background: themeTokens.colorScheme.inversePrimary,
  },
});

const classNames = createStyles({
  root: {
    height: tokens.container.height,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: tokens.container.leadingSpace,
    paddingRight: tokens.container.trailingSpace,
    gap: tokens.container.gap,
    cursor: 'text',

    vars: overrideTokens(PaperBase.theme.tokens, {
      container: {
        color: tokens.container.color,
        elevation: tokens.container.elevation,
        shape: tokens.container.shape,
      },
    }),
  },
  stateLayer: {
    vars: overrideTokens(StateLayer.theme.tokens, {
      color: {
        hovered: tokens.stateLayer.hovered,
        pressed: tokens.stateLayer.pressed,
      },
    }),
  },
  startSlot: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    color: tokens.leadingIcon.color,
    fontSize: tokens.leadingIcon.size,
    height: tokens.leadingIcon.size,
    minWidth: tokens.leadingIcon.size,
  },
  input: {
    overflowWrap: 'inherit',
    resize: 'none',
    width: '100%',
    height: '100%',
    // Remove extra height added by horizontal scrollbars.
    overflowX: 'hidden',
    textAlign: 'inherit',
    padding: 0,
    borderStyle: 'unset',
    display: 'block',
    caretColor: tokens.caret.color,
    cursor: 'text',

    ...typography(tokens.inputText.typography),
    color: tokens.inputText.color,

    '::placeholder': {
      WebkitTextFillColor: tokens.placeholder.color,
      color: tokens.placeholder.color,
    },
    '::selection': {
      backgroundColor: tokens.selection.background,
      color: tokens.selection.color,
    },
  },
  endSlot: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: tokens.container.trailingSlotGap,

    color: tokens.trailingIcon.color,
    fontSize: tokens.trailingIcon.size,
    height: tokens.trailingIcon.size,
    minWidth: tokens.trailingIcon.size,
  },
  avatar: {
    vars: overrideTokens(Avatar.theme.tokens, {
      size: tokens.avatar.size,
    }),
  },
});

export type ISearchBarThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
}>;

export const searchBarTheme = componentThemeFactory<ISearchBarThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
