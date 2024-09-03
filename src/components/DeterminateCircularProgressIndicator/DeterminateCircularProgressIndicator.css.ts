import { createTheme } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import cx from 'clsx';

import {
  stylesFactory,
  type IStylesFactory,
} from '~/utils/styles/stylesFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { mergeClassNames } from '~/utils/styles/mergeClassNames';
import { deepMerge } from '~/helpers/deepMerge';
import { getTypographyStyles } from '~/helpers/styles/getTypographyStyles';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { themeTokens } from '../ThemeProvider';
import { circularProgressIndicatorStyles } from '../CircularProgressIndicator/CircularProgressIndicator.css';

type IModifier = 'disabled';

const parentStyles = circularProgressIndicatorStyles;

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
  root: {},
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
      r: calc.multiply(
        '50%',
        calc.subtract(1, calc.divide(parentStyles.tokens.widthPct, 100)),
      ),
      strokeWidth: calc.multiply(parentStyles.tokens.widthPct, '1%'),
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
    fontSize: calc.multiply(
      calc.multiply(tokens.label.typography.size, 0.33),
      themeTokens.scale,
    ),

    selectors: {
      [getModifierSelector<IModifier>('disabled', root)]: {
        color: tokens.label.color.disabled,
        opacity: tokens.label.opacity.disabled,
      },
    },
  }),
});

export type IDeterminateCircularProgressIndicatorStylesFactory =
  IStylesFactory<{
    styleName: keyof typeof parentStyles.classNames | keyof typeof classNames;
    tokens: typeof parentStyles.tokens | typeof tokens;
    modifier: IModifier;
  }>;

export const determinateCircularProgressIndicatorStyles =
  stylesFactory<IDeterminateCircularProgressIndicatorStylesFactory>({
    classNames: mergeClassNames(parentStyles.classNames, classNames),
    tokensClassName: cx(parentStyles.tokensClassName, tokensClassName),
    tokens: deepMerge(parentStyles.tokens, tokens),
  });
