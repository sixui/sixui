import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { Diagonals } from '~/components/Diagonals';
import { themeTokens } from '~/components/ThemeProvider';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { getTypographyStyles } from '~/helpers/styles/getTypographyStyles';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createComponentTheme } from '~/utils/styles/createComponentTheme';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { COMPONENT_NAME } from './Placeholder.constants';

type IModifier = 'disabled';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  diagonals: {
    color: themeTokens.colorScheme.outlineVariant,
  },
  label: {
    typography: themeTokens.typeScale.label.sm,
    opacity: '1',
  },
});

const classNames = createStyles({
  root: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  diagonals: ({ root }) => ({
    vars: createTokensVars(Diagonals.theme.tokens, {
      color: tokens.diagonals.color,
      width: px(themeTokens.outline.width.xs),
    }),

    selectors: {
      [`${getModifierSelector<IModifier>('disabled', root)}::before`]: {
        opacity: themeTokens.state.opacity.disabled,
      },
      [`${getModifierSelector<IModifier>('disabled', root)}::after`]: {
        opacity: themeTokens.state.opacity.disabled,
      },
    },
  }),
  label: ({ root }) => ({
    position: 'relative',
    padding: px(space(2)),
    opacity: tokens.label.opacity,
    ...getTypographyStyles(tokens.label.typography),

    selectors: {
      [getModifierSelector<IModifier>('disabled', root)]: {
        vars: {
          [tokens.label.opacity]: themeTokens.state.opacity.disabled,
        },
      },
    },
  }),
});

export type IPlaceholderThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const placeholderTheme = componentThemeFactory<IPlaceholderThemeFactory>(
  {
    classNames,
    tokensClassName,
    tokens,
  },
);
