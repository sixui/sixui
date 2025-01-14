import { createTheme } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { Divider } from '../Divider';
import { cssLayers, themeTokens } from '../ThemeProvider';

type IModifier = 'orientation' | 'step-label-position' | 'completed';

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  stroke: px(themeTokens.outline.width.xs),
  shape: px(themeTokens.shape.corner.none),
  color: {
    normal: themeTokens.colorScheme.outlineVariant,
    completed: themeTokens.colorScheme.primary,
  },
  label: {
    color: {
      normal: themeTokens.colorScheme.outline,
      completed: themeTokens.colorScheme.primary,
    },
  },
});

// FIXME:
const topSpace = '8px';
const leadingSpace = '8px';
const stepIndicatorSize = '24px';

const classNames = createStyles({
  root: {
    vars: createTokensVars(Divider.theme.tokens, {
      stroke: tokens.stroke,
      shape: tokens.shape,
      color: tokens.color.normal,
      label: {
        color: tokens.label.color.normal,
      },
    }),

    selectors: {
      [getModifierSelector<IModifier>('completed')]: {
        vars: createTokensVars(Divider.theme.tokens, {
          stroke: tokens.stroke,
          shape: tokens.shape,
          color: tokens.color.completed,
          label: {
            color: tokens.label.color.completed,
          },
        }),
      },
      [getModifierSelector<IModifier>({
        orientation: 'horizontal',
        'step-label-position': 'bottom',
      })]: {
        marginTop: calc.add(
          calc.negate(calc.divide(tokens.stroke, 2)),
          topSpace,
          calc.divide(stepIndicatorSize, 2),
        ),
      },
      [getModifierSelector<IModifier>({
        orientation: 'vertical',
        'step-label-position': 'right',
      })]: {
        marginLeft: calc.add(
          calc.negate(calc.divide(tokens.stroke, 2)),
          leadingSpace,
          calc.divide(stepIndicatorSize, 2),
        ),
      },
      [getModifierSelector<IModifier>({
        orientation: 'vertical',
        'step-label-position': 'bottom',
      })]: {
        // This style is never applied because the vertical orientation does not
        // support bottom label.
      },
    },
  },
});

export type IStepConnectorThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const dividerTheme = componentThemeFactory<IStepConnectorThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
