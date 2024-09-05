import { createTheme } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import cx from 'clsx';

import {
  componentThemeFactory,
  type IComponentThemeFactory,
} from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { deepMerge } from '~/helpers/deepMerge';
import { getTypographyStyles } from '~/helpers/styles/getTypographyStyles';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { mergeClassNames } from '~/utils/styles/mergeClassNames';
import { themeTokens } from '../ThemeProvider';
import { circularProgressIndicatorTheme } from '../CircularProgressIndicator/CircularProgressIndicator.css';

type IModifier = 'disabled';

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

const classNames = createStyles({
  svg: {
    transform: 'rotate(-90deg)',
  },
  svgCircle: {
    // Hack to use svg attributes without TS error.
    ...{
      cx: '50%',
      cy: '50%',
      // Note, pathLength is set so this can be normalized.
      strokeDasharray: '100',
      fill: 'transparent',
      r: calc.subtract(
        '50%',
        calc.divide(calc.multiply(parentStyles.tokens.strokePct, '1%'), 2),
      ),
      strokeWidth: calc.multiply(parentStyles.tokens.strokePct, '1%'),
    },
  },
  track: {
    stroke: 'transparent',
  },
  activeTrack: ({ root }) => ({
    transitionProperty: 'stroke-dashoffset',
    transitionDuration: themeTokens.motion.duration.long.$2,
    transitionTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
    stroke: parentStyles.tokens.color.normal,

    selectors: {
      [getModifierSelector<IModifier>('disabled', root)]: {
        stroke: parentStyles.tokens.color.disabled,
        opacity: parentStyles.tokens.opacity.disabled,
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
