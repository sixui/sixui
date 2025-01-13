import { createTheme } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { getDensity } from '~/helpers/styles/getDensity';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { getTypographyStyles } from '~/helpers/styles/getTypographyStyles';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { Button } from '../Button';
import { cssLayers, themeTokens } from '../ThemeProvider';

type IModifier = 'orientation' | 'label-position';

const DENSITY = px(getDensity({ min: -2, max: 0 }));

// FIXME:
const stepIndicatorSize = '24px';

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  container: {
    leadingSpace: px(space(2)),
    trailingSpace: px(space(2)),
    // For a proper rendering, should be at least (StepConnector.thickness / 2).
    topSpace: px(space(2)),
    // For a proper rendering, should be at least (StepConnector.thickness / 2).
    bottomSpace: px(space(2)),
    shape: themeTokens.shape.corner.md,
    connectorSpace: px(space(2)),
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
  connector: {
    shape: themeTokens.shape.corner.full,
    minLength: px(space(4)),
  },
});

const classNames = createStyles({
  root: {
    display: 'contents',
  },
  wrapper: ({ root }) => ({
    position: 'relative',

    selectors: {
      [getModifierSelector<IModifier>({ 'label-position': 'bottom' }, root)]: {
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
      stepIndicatorSize,
      tokens.container.bottomSpace,
      calc.multiply(tokens.container.connectorSpace, 2),
    ),

    selectors: {
      [getModifierSelector<IModifier>({ 'label-position': 'bottom' }, root)]: {
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

    vars: createTokensVars(Button.theme.tokens, {
      container: {
        shape: tokens.container.shape,
        color: {
          disabled: 'unset',
        },
        leadingSpace: {
          normal: tokens.container.leadingSpace,
          withStartSlot: tokens.container.leadingSpace,
          withEndSlot: tokens.container.leadingSpace,
        },
        trailingSpace: {
          normal: tokens.container.trailingSpace,
          withStartSlot: tokens.container.leadingSpace,
          withEndSlot: tokens.container.leadingSpace,
        },
      },
      icon: {
        labelSpace: px(0),
      },
    }),

    selectors: {
      [getModifierSelector<IModifier>({ 'label-position': 'bottom' }, root)]: {
        flexDirection: 'column',
        gap: calc.add(px(space(1)), DENSITY),
        textAlign: 'center',
      },
    },
  }),
  supportingText: {
    ...getTypographyStyles(tokens.supportingText.typography),
    color: tokens.supportingText.color.normal,
  },
  extensibleConnectorContainer: ({ root }) => ({
    display: 'flex',
    position: 'relative',
    flexGrow: 1,
    flexShrink: 0,

    selectors: {
      [getModifierSelector<IModifier>({ orientation: 'horizontal' }, root)]: {
        alignItems: 'center',
        minWidth: tokens.connector.minLength,
      },
      [getModifierSelector<IModifier>({ orientation: 'vertical' }, root)]: {
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
      [getModifierSelector<IModifier>(
        {
          orientation: 'horizontal',
        },
        root,
      )]: {
        flexDirection: 'row',
        borderRadius: tokens.connector.shape,
      },
      [getModifierSelector<IModifier>(
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
                stepIndicatorSize,
                tokens.container.bottomSpace,
              ),
              2,
            ),

            calc.add(
              tokens.container.topSpace,
              calc.divide(stepIndicatorSize, 2),
            ),
          ),
        )})`,
        marginLeft: calc.add(
          calc.negate(tokens.container.trailingSpace),
          tokens.container.connectorSpace,
        ),
        marginRight: calc.add(
          calc.negate(tokens.container.leadingSpace),
          tokens.container.connectorSpace,
        ),
      },
      [getModifierSelector<IModifier>(
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
                  stepIndicatorSize,
                  tokens.container.trailingSpace,
                ),
                2,
              ),
              calc.add(
                tokens.container.leadingSpace,
                calc.divide(stepIndicatorSize, 2),
              ),
            ),
          ),
          calc.divide(stepIndicatorSize, 2),
          tokens.container.connectorSpace,
        ),
        right: calc.add(
          '-50%',
          calc.add(
            calc.subtract(
              calc.divide(
                calc.add(
                  tokens.container.leadingSpace,
                  stepIndicatorSize,
                  tokens.container.trailingSpace,
                ),
                2,
              ),
              calc.add(
                tokens.container.leadingSpace,
                calc.divide(stepIndicatorSize, 2),
              ),
            ),
            calc.divide(stepIndicatorSize, 2),
            tokens.container.connectorSpace,
          ),
        ),
      },
    },
  }),
});

export type IStepThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const stepTheme = componentThemeFactory<IStepThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
