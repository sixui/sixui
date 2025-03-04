import { createVar } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import cx from 'clsx';

import type { ICircularProgressIndicatorModifier } from '~/components/CircularProgressIndicator/CircularProgressIndicator.css';
import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { em, getVarNameFromToken } from '~/utils/css';
import { createStyles } from '~/utils/css/createStyles';
import { mergeClassNames } from '~/utils/css/mergeClassNames';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { typography } from '~/utils/css/typography';
import { deepMerge } from '~/utils/deepMerge';
import { circularProgressIndicatorTheme } from '~/components/CircularProgressIndicator/CircularProgressIndicator.css';
import { themeTokens } from '~/components/Theme/theme.css';
import { COMPONENT_NAME } from './DeterminateCircularProgressIndicator.constants';

type IModifier = ICircularProgressIndicatorModifier;

const parentStyles = circularProgressIndicatorTheme;

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  progressPct: '0%',
  spacing: '2%',
  label: {
    typography: themeTokens.typeScale.label.md,
    fontSize: em(0.3),
    color: {
      normal: themeTokens.colorScheme.onSurface,
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
  },
});

const ANTIALIASING_EPSILON = '0.5px';
const MASK_RADIUS = calc.subtract(
  calc.divide(parentStyles.tokens.container.size, 2),
  parentStyles.tokens.strokeWidth,
  parentStyles.tokens.container.padding,
);

const localVars = {
  progressPct: createVar({
    syntax: '<percentage>',
    inherits: true,
    initialValue: '0%',
  }),
  spacing: createVar(),
};

const classNames = createStyles({
  root: {
    borderRadius: themeTokens.shape.corner.circle,

    vars: {
      [localVars.progressPct]: tokens.progressPct,
      [localVars.spacing]: `min(${calc.subtract(
        '100%',
        localVars.progressPct,
      )}, min(${localVars.progressPct}, ${tokens.spacing}))`,
    },

    selectors: {
      [modifierSelector<IModifier>('negative')]: {
        vars: {
          [localVars.progressPct]: `${calc.multiply(
            calc.subtract(1, calc.multiply(localVars.progressPct, -1)),
            '100%',
          )}%`,
        },
      },
    },
  },
  activeIndicator: ({ root }) => ({
    position: 'absolute',
    overflow: 'hidden',
    inset: 0,
    mask: `radial-gradient(
      transparent ${calc.subtract(MASK_RADIUS, ANTIALIASING_EPSILON)},
      black ${calc.add(MASK_RADIUS, ANTIALIASING_EPSILON)}
      )`,
    backgroundImage: `conic-gradient(
      currentColor 0 ${localVars.progressPct},
      transparent ${localVars.progressPct} 100%
    )`,

    transitionProperty: getVarNameFromToken(localVars.progressPct),
    transitionDuration: themeTokens.motion.duration.medium3,
    transitionTimingFunction: themeTokens.motion.easing.emphasized.decelerate,

    selectors: {
      [modifierSelector<IModifier>('negative', root)]: {
        backgroundImage: `conic-gradient(
          transparent 0 ${localVars.progressPct},
          currentColor ${localVars.progressPct} 100%
        )`,
      },
      [modifierSelector<IModifier>('disabled', root)]: {
        color: parentStyles.tokens.activeIndicator.color.disabled,
        opacity: parentStyles.tokens.activeIndicator.opacity.disabled,
      },
      [modifierSelector<IModifier>(['!disabled', 'negative'], root)]: {
        color: parentStyles.tokens.activeIndicator.color.negative,
      },
    },
  }),
  inactiveTrack: ({ root }) => ({
    position: 'absolute',
    overflow: 'hidden',
    inset: 0,
    // color: parentStyles.,
    mask: `radial-gradient(
      transparent ${calc.subtract(MASK_RADIUS, ANTIALIASING_EPSILON)},
      black ${calc.add(MASK_RADIUS, ANTIALIASING_EPSILON)}
    )`,
    backgroundImage: `conic-gradient(
      transparent 0 ${calc.add(localVars.progressPct, localVars.spacing)},
      currentColor ${calc.add(localVars.progressPct, localVars.spacing)} ${calc.subtract('100%', localVars.spacing)},
      transparent ${calc.subtract('100%', localVars.spacing)}
    )`,
    color: parentStyles.tokens.inactiveTrack.color.normal,

    selectors: {
      [modifierSelector<IModifier>('negative', root)]: {
        backgroundImage: `conic-gradient(
          transparent 0 ${localVars.spacing},
          currentColor ${localVars.spacing} ${calc.subtract(localVars.progressPct, localVars.spacing)},
          transparent ${calc.subtract(localVars.progressPct, localVars.spacing)}
        )`,
      },
      [modifierSelector<IModifier>('disabled', root)]: {
        color: parentStyles.tokens.inactiveTrack.color.disabled,
        opacity: parentStyles.tokens.inactiveTrack.opacity.disabled,
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
    fontSize: tokens.label.fontSize,

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
