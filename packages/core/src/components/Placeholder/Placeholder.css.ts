import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { Diagonals } from '~/components/Diagonals';
import { themeTokens } from '~/components/Theme';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { px } from '~/utils/css/px';
import { space } from '~/utils/css/space';
import { typography } from '~/utils/css/typography';
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
    borderRadius: 'inherit',
  },
  diagonals: ({ root }) => ({
    vars: overrideTokens(Diagonals.theme.tokens, {
      color: tokens.diagonals.color,
      width: px(themeTokens.outline.width.xs),
    }),

    selectors: {
      [`${modifierSelector<IModifier>('disabled', root)}::before`]: {
        opacity: themeTokens.state.opacity.disabled,
      },
      [`${modifierSelector<IModifier>('disabled', root)}::after`]: {
        opacity: themeTokens.state.opacity.disabled,
      },
    },
  }),
  label: ({ root }) => ({
    position: 'relative',
    padding: px(space(2)),
    opacity: tokens.label.opacity,
    ...typography(tokens.label.typography),

    selectors: {
      [modifierSelector<IModifier>('disabled', root)]: {
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
