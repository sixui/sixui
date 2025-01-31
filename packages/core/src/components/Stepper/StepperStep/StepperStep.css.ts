import { fallbackVar } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { Button } from '~/components/Button';
import { themeTokens } from '~/components/ThemeProvider';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { density } from '~/utils/css/density';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { px } from '~/utils/css/px';
import { space } from '~/utils/css/space';
import { typography } from '~/utils/css/typography';
import { stepperTheme } from '../Stepper.css';
import { COMPONENT_NAME } from './StepperStep.constants';
import { StepperStepIndicator } from './StepperStepIndicator';

type IModifier = 'orientation' | 'label-position';

const DENSITY = px(density({ min: -2, max: 0 }));

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  container: {
    leadingSpace: px(space(2)),
    trailingSpace: px(space(2)),
    // For a proper rendering, should be at least (StepperStepConnector.thickness / 2).
    topSpace: px(space(2)),
    // For a proper rendering, should be at least (StepperStepConnector.thickness / 2).
    bottomSpace: px(space(2)),
    shape: px(themeTokens.shape.corner.md),
  },
  label: {
    typography: themeTokens.typeScale.label.lg,
    color: {
      normal: themeTokens.colorScheme.onSurface,
      completed: themeTokens.colorScheme.onSurface,
      error: themeTokens.colorScheme.error,
      interactive: themeTokens.colorScheme.primary,
      inactive: themeTokens.colorScheme.onSurface,
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      inactive: '1',
      disabled: themeTokens.state.opacity.disabled,
    },
  },
  supportingText: {
    typography: themeTokens.typeScale.label.sm,
    color: {
      normal: themeTokens.colorScheme.onSurface,
      completed: themeTokens.colorScheme.onSurface,
      error: themeTokens.colorScheme.error,
      interactive: themeTokens.colorScheme.onSurface,
      inactive: themeTokens.colorScheme.onSurface,
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      inactive: '1',
      disabled: themeTokens.state.opacity.disabled,
    },
  },
  content: {
    typography: themeTokens.typeScale.body.md,
    color: themeTokens.colorScheme.onSurface,
  },
  indicator: {
    size: px(24),
  },
  connector: {
    shape: px(themeTokens.shape.corner.full),
    minLength: px(space(4)),
    space: fallbackVar(stepperTheme.tokens.connector.space, px(space(2))),
  },
});

const classNames = createStyles({
  root: {
    display: 'contents',
  },
  wrapper: ({ root }) => ({
    position: 'relative',

    selectors: {
      [modifierSelector<IModifier>({ 'label-position': 'bottom' }, root)]: {
        flexGrow: 1,
        justifyContent: 'center',
      },
    },
  }),
  buttonContainer: ({ root }) => ({
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: calc.add(
      tokens.container.topSpace,
      tokens.indicator.size,
      tokens.container.bottomSpace,
      calc.multiply(tokens.connector.space, 2),
    ),

    selectors: {
      [modifierSelector<IModifier>({ 'label-position': 'bottom' }, root)]: {
        flexDirection: 'column',
      },
    },
  }),
  button: ({ root }) => ({
    minWidth: 'unset',
    minHeight: 'unset',
    paddingTop: calc.add(tokens.container.topSpace, DENSITY),
    paddingBottom: calc.add(tokens.container.bottomSpace, DENSITY),
    gap: px(space(2)),
    textAlign: 'start',

    vars: overrideTokens(Button.theme.tokens, {
      container: {
        shape: tokens.container.shape,
        color: {
          disabled: 'unset',
        },
        leadingSpace: {
          normal: tokens.container.leadingSpace,
          withStart: tokens.container.leadingSpace,
        },
        trailingSpace: {
          normal: tokens.container.trailingSpace,
          withEnd: tokens.container.leadingSpace,
        },
      },
      icon: {
        labelSpace: px(0),
      },
    }),

    selectors: {
      [modifierSelector<IModifier>({ 'label-position': 'bottom' }, root)]: {
        flexDirection: 'column',
        gap: calc.add(px(space(1)), DENSITY),
        textAlign: 'center',
      },
    },
  }),
  indicator: {
    vars: overrideTokens(StepperStepIndicator.theme.tokens, {
      container: {
        size: tokens.indicator.size,
      },
    }),
  },
  supportingText: {
    ...typography(tokens.supportingText.typography),
    color: tokens.supportingText.color.normal,
  },
  extensibleConnectorContainer: ({ root }) => ({
    display: 'flex',
    position: 'relative',
    flexGrow: 1,
    flexShrink: 0,

    selectors: {
      [modifierSelector<IModifier>({ orientation: 'horizontal' }, root)]: {
        alignItems: 'center',
        minWidth: tokens.connector.minLength,
      },
      [modifierSelector<IModifier>({ orientation: 'vertical' }, root)]: {
        alignItems: 'stretch',
        minHeight: tokens.connector.minLength,
      },
    },
  }),
  connectorContainer: ({ root }) => ({
    display: 'flex',
    flexGrow: 1,
    flexBasis: 0,
    position: 'relative',
    borderRadius: 'inherit',

    selectors: {
      [modifierSelector<IModifier>(
        {
          orientation: 'horizontal',
        },
        root,
      )]: {
        flexDirection: 'row',
        borderRadius: tokens.connector.shape,
      },
      [modifierSelector<IModifier>(
        {
          orientation: 'horizontal',
          'label-position': 'right',
        },
        root,
      )]: {
        position: 'relative',
        transform: `translateY(${calc.negate(
          calc.subtract(
            calc.divide(
              calc.add(
                tokens.container.topSpace,
                tokens.indicator.size,
                tokens.container.bottomSpace,
              ),
              2,
            ),

            calc.add(
              tokens.container.topSpace,
              calc.divide(tokens.indicator.size, 2),
            ),
          ),
        )})`,
        marginLeft: calc.add(
          calc.negate(tokens.container.trailingSpace),
          tokens.connector.space,
        ),
        marginRight: calc.add(
          calc.negate(tokens.container.leadingSpace),
          tokens.connector.space,
        ),
      },
      [modifierSelector<IModifier>(
        {
          orientation: 'horizontal',
          'label-position': 'bottom',
        },
        root,
      )]: {
        position: 'absolute',
        top: 0,
        left: calc.add(
          '50%',
          calc.negate(
            calc.subtract(
              calc.divide(
                calc.add(
                  tokens.container.leadingSpace,
                  tokens.indicator.size,
                  tokens.container.trailingSpace,
                ),
                2,
              ),
              calc.add(
                tokens.container.leadingSpace,
                calc.divide(tokens.indicator.size, 2),
              ),
            ),
          ),
          calc.divide(tokens.indicator.size, 2),
          tokens.connector.space,
        ),
        right: calc.add(
          '-50%',
          calc.add(
            calc.subtract(
              calc.divide(
                calc.add(
                  tokens.container.leadingSpace,
                  tokens.indicator.size,
                  tokens.container.trailingSpace,
                ),
                2,
              ),
              calc.add(
                tokens.container.leadingSpace,
                calc.divide(tokens.indicator.size, 2),
              ),
            ),
            calc.divide(tokens.indicator.size, 2),
            tokens.connector.space,
          ),
        ),
      },
    },
  }),
  connectorContainer$top: {
    position: 'absolute',
    display: 'flex',
    left: 0,
    top: 0,
    bottom: calc.add(
      '50%',
      calc.subtract(
        calc.divide(
          calc.add(
            tokens.container.topSpace,
            tokens.indicator.size,
            tokens.container.bottomSpace,
          ),
          2,
        ),
        calc.add(
          tokens.container.topSpace,
          calc.divide(tokens.indicator.size, 2),
        ),
      ),
      calc.divide(tokens.indicator.size, 2),
      tokens.connector.space,
    ),
    borderBottomLeftRadius: tokens.connector.shape,
    borderBottomRightRadius: tokens.connector.shape,
  },
  connectorContainer$bottom: {
    position: 'absolute',
    display: 'flex',
    left: 0,
    top: calc.add(
      calc.subtract(
        '50%',
        calc.subtract(
          calc.divide(
            calc.add(
              tokens.container.topSpace,
              tokens.indicator.size,
              tokens.container.bottomSpace,
            ),
            2,
          ),
          calc.add(
            tokens.container.topSpace,
            calc.divide(tokens.indicator.size, 2),
          ),
        ),
      ),
      calc.divide(tokens.indicator.size, 2),
      tokens.connector.space,
    ),
    bottom: 0,
    borderBottomLeftRadius: tokens.connector.shape,
    borderBottomRightRadius: tokens.connector.shape,
  },
  connectorContainer$content: {
    display: 'flex',
    width: 0,
    flexGrow: 0,
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
  },
  contentText: {
    color: tokens.content.color,
    ...typography(tokens.content.typography),
    paddingLeft: calc.add(
      tokens.container.leadingSpace,
      tokens.indicator.size,
      px(space(2)),
    ),
    paddingRight: tokens.container.trailingSpace,
  },
});

export type IStepperStepThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const stepperStepTheme = componentThemeFactory<IStepperStepThemeFactory>(
  {
    classNames,
    tokensClassName,
    tokens,
  },
);
