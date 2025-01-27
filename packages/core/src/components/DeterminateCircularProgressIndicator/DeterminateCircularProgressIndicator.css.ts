import { calc } from '@vanilla-extract/css-utils';
import cx from 'clsx';

import type { ICircularProgressIndicatorModifier } from '~/components/CircularProgressIndicator/CircularProgressIndicator.css';
import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { themeTokens } from '~/components/ThemeProvider';
import { deepMerge } from '~/helpers/deepMerge';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { getTypographyStyles } from '~/helpers/styles/getTypographyStyles';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTheme } from '~/utils/styles/createTheme';
import { mergeClassNames } from '~/utils/styles/mergeClassNames';
import { circularProgressIndicatorTheme } from '~/components/CircularProgressIndicator/CircularProgressIndicator.css';

type IModifier = ICircularProgressIndicatorModifier;

const parentStyles = circularProgressIndicatorTheme;

const [tokensClassName, tokens] = createTheme({
  label: {
    color: {
      normal: themeTokens.colorScheme.onSurface,
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
    typography: themeTokens.typeScale.label.sm,
  },
});

const ANTIALIASING_EPSILON = '0.5px';
const MASK_RADIUS = calc.subtract(
  calc.divide(parentStyles.tokens.size, 2),
  parentStyles.tokens.strokeWidth,
  parentStyles.tokens.containerPadding,
);

const classNames = createStyles({
  root: {
    borderRadius: themeTokens.shape.corner.circle,
  },
  ring: ({ root }) => ({
    mask: `radial-gradient(transparent ${calc.subtract(MASK_RADIUS, ANTIALIASING_EPSILON)}, black ${calc.add(MASK_RADIUS, ANTIALIASING_EPSILON)})`,

    selectors: {
      [getModifierSelector<IModifier>('disabled', root)]: {
        color: tokens.label.color.disabled,
        opacity: themeTokens.state.opacity.disabled,
      },
    },
  }),
  label: ({ root }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    color: tokens.label.color.normal,
    ...getTypographyStyles(tokens.label.typography),
    fontSize: calc.multiply(calc.multiply(0.25, '1em'), themeTokens.scale),

    selectors: {
      [getModifierSelector<IModifier>('disabled', root)]: {
        color: tokens.label.color.disabled,
        opacity: tokens.label.opacity.disabled,
      },
    },
  }),
});

export type IDeterminateCircularProgressIndicatorThemeFactory =
  IComponentThemeFactory<{
    styleName: keyof typeof parentStyles.classNames | keyof typeof classNames;
    tokens: typeof parentStyles.tokens | typeof tokens;
    modifier: IModifier;
  }>;

export const determinateCircularProgressIndicatorTheme =
  componentThemeFactory<IDeterminateCircularProgressIndicatorThemeFactory>({
    classNames: mergeClassNames(parentStyles.classNames, classNames),
    tokensClassName: cx(parentStyles.tokensClassName, tokensClassName),
    tokens: deepMerge(parentStyles.tokens, tokens),
  });
