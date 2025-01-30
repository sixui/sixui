import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { Divider } from '~/components/Divider';
import { themeTokens } from '~/components/ThemeProvider';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createComponentTheme } from '~/utils/styles/createComponentTheme';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { stepperStepTheme } from '../StepperStep/StepperStep.css';
import { COMPONENT_NAME } from './StepperConnector.constants';

type IModifier = 'orientation' | 'step-label-position' | 'completed';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
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
          stepperStepTheme.tokens.container.topSpace,
          calc.divide(stepperStepTheme.tokens.indicator.size, 2),
        ),
      },
      [getModifierSelector<IModifier>({
        orientation: 'vertical',
        'step-label-position': 'right',
      })]: {
        marginLeft: calc.add(
          calc.negate(calc.divide(tokens.stroke, 2)),
          stepperStepTheme.tokens.container.leadingSpace,
          calc.divide(stepperStepTheme.tokens.indicator.size, 2),
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

export type IStepperConnectorThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const dividerTheme =
  componentThemeFactory<IStepperConnectorThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
