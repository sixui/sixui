import { createVar } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import cx from 'clsx';

import type { ICircularProgressIndicatorModifier } from '~/components/CircularProgressIndicator/CircularProgressIndicator.css';
import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { themeTokens } from '~/components/Theme';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { px } from '~/utils/css';
import { createStyles } from '~/utils/css/createStyles';
import { mergeClassNames } from '~/utils/css/mergeClassNames';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { typography } from '~/utils/css/typography';
import { deepMerge } from '~/utils/deepMerge';
import { circularProgressIndicatorTheme } from '~/components/CircularProgressIndicator/CircularProgressIndicator.css';
import { COMPONENT_NAME } from './DeterminateCircularProgressIndicator.constants';

type IModifier = ICircularProgressIndicatorModifier;

const parentStyles = circularProgressIndicatorTheme;

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  progress: '0',
  progressSpace: '8deg',
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

const localVars = {
  progressDegrees: createVar(),
};

const classNames = createStyles({
  root: {
    borderRadius: themeTokens.shape.corner.circle,

    vars: {
      [localVars.progressDegrees]: calc.multiply(tokens.progress, '360deg'),
    },

    selectors: {
      [modifierSelector<IModifier>('negative')]: {
        vars: {
          [localVars.progressDegrees]: calc.multiply(
            calc.subtract(1, calc.multiply(tokens.progress, -1)),
            '360deg',
          ),
        },
      },
    },
  },
  track: ({ root }) => ({
    position: 'absolute',
    overflow: 'hidden',
    inset: 0,
    // color: parentStyles.,
    mask: `radial-gradient(
      transparent ${calc.subtract(MASK_RADIUS, ANTIALIASING_EPSILON)},
      black ${calc.add(MASK_RADIUS, ANTIALIASING_EPSILON)}
    )`,
    background: `conic-gradient(
      transparent 0 ${calc.add(localVars.progressDegrees, tokens.progressSpace)},
      currentColor ${calc.add(localVars.progressDegrees, tokens.progressSpace)} ${calc.subtract('360deg', tokens.progressSpace)},
      transparent ${calc.subtract('360deg', tokens.progressSpace)}
    )`,

    selectors: {
      [modifierSelector<IModifier>('negative', root)]: {
        background: `conic-gradient(
          transparent 0 ${tokens.progressSpace},
          currentColor ${tokens.progressSpace} ${calc.subtract(localVars.progressDegrees, tokens.progressSpace)},
          transparent ${calc.subtract(localVars.progressDegrees, tokens.progressSpace)}
        )`,
      },
    },
  }),
  activeIndicator: ({ root }) => ({
    position: 'absolute',
    overflow: 'hidden',
    inset: 0,
    mask: `radial-gradient(
      transparent ${calc.subtract(MASK_RADIUS, ANTIALIASING_EPSILON)},
      black ${calc.add(MASK_RADIUS, ANTIALIASING_EPSILON)}
      )`,
    background: `conic-gradient(
      currentColor 0 ${localVars.progressDegrees},
      transparent ${localVars.progressDegrees} 360deg
    )`,

    selectors: {
      [modifierSelector<IModifier>('negative', root)]: {
        background: `conic-gradient(
          transparent 0 ${localVars.progressDegrees},
          currentColor ${localVars.progressDegrees} 360deg
        )`,
      },
    },
  }),
  label: ({ root }) => ({
    position: 'absolute',
    overflow: 'hidden',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    color: tokens.label.color.normal,
    ...typography(tokens.label.typography),
    fontSize: px(calc.multiply(0.25, '1em')),

    selectors: {
      [modifierSelector<IModifier>('disabled', root)]: {
        color: tokens.label.color.disabled,
        opacity: tokens.label.opacity.disabled,
      },
    },
  }),
});

export type IDeterminateCircularProgressIndicatorThemeFactory =
  IComponentThemeFactory<{
    styleName: keyof typeof parentStyles.classNames | keyof typeof classNames;
    tokens: typeof parentStyles.tokens & typeof tokens;
    modifier: IModifier;
  }>;

export const determinateCircularProgressIndicatorTheme =
  componentThemeFactory<IDeterminateCircularProgressIndicatorThemeFactory>({
    classNames: mergeClassNames(parentStyles.classNames, classNames),
    tokensClassName: cx(parentStyles.tokensClassName, tokensClassName),
    tokens: deepMerge(
      parentStyles.tokens,
      tokens,
    ) as typeof parentStyles.tokens & typeof tokens,
  });
