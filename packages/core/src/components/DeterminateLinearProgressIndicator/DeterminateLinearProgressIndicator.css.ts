import { createVar } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import cx from 'clsx';

import type { ILinearProgressIndicatorModifier } from '~/components/LinearProgressIndicator/LinearProgressIndicator.css';
import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { themeTokens } from '~/components/Theme';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { mergeClassNames, modifierSelector } from '~/utils/css';
import { createStyles } from '~/utils/css/createStyles';
import { px } from '~/utils/css/px';
import { deepMerge } from '~/utils/deepMerge';
import { linearProgressIndicatorTheme } from '~/components/LinearProgressIndicator/LinearProgressIndicator.css';
import { COMPONENT_NAME } from './DeterminateLinearProgressIndicator.constants';

type IModifier = ILinearProgressIndicatorModifier;

const parentStyles = linearProgressIndicatorTheme;

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  progress: '0',
  spacing: px(4),
  stopIndicator: {
    size: `round(up, ${px(4)}, 1px)`,
    shape: `round(up, ${px(4)}, 1px)`,
    color: {
      normal: themeTokens.colorScheme.primary,
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
  },
});

const localVars = {
  spacing: createVar(),
};

const classNames = createStyles({
  root: {
    vars: {
      [localVars.spacing]: `min(${calc.subtract(
        '100%',
        calc.multiply(tokens.progress, '100%'),
      )}, min(${calc.multiply(tokens.progress, '100%')}, ${tokens.spacing}))`,
    },
  },
  activeIndicator: ({ root }) => ({
    width: calc.multiply(tokens.progress, '100%'),
    marginRight: localVars.spacing,
    height: parentStyles.tokens.container.height,
    borderRadius: 'inherit',
    backgroundColor: parentStyles.tokens.activeIndicator.color.normal,

    transitionProperty: 'width, margin-right',
    transitionDuration: themeTokens.motion.duration.medium3,
    transitionTimingFunction: themeTokens.motion.easing.emphasized.decelerate,

    selectors: {
      [modifierSelector<IModifier>('disabled', root)]: {
        backgroundColor: parentStyles.tokens.activeIndicator.color.disabled,
        opacity: parentStyles.tokens.activeIndicator.opacity.disabled,
      },
    },
  }),
  stopIndicator: ({ root }) => ({
    position: 'absolute',
    top: 0,
    right: 0,
    width: tokens.stopIndicator.size,
    height: tokens.stopIndicator.size,
    borderRadius: tokens.stopIndicator.shape,
    backgroundColor: tokens.stopIndicator.color.normal,

    selectors: {
      [modifierSelector<IModifier>('disabled', root)]: {
        backgroundColor: tokens.stopIndicator.color.disabled,
        opacity: tokens.stopIndicator.opacity.disabled,
      },
    },
  }),
});

export type IDeterminateLinearProgressIndicatorThemeFactory =
  IComponentThemeFactory<{
    styleName: keyof typeof parentStyles.classNames | keyof typeof classNames;
    tokens: typeof parentStyles.tokens & typeof tokens;
    modifier: IModifier;
  }>;

export const determinateLinearProgressIndicatorTheme =
  componentThemeFactory<IDeterminateLinearProgressIndicatorThemeFactory>({
    classNames: mergeClassNames(parentStyles.classNames, classNames),
    tokensClassName: cx(parentStyles.tokensClassName, tokensClassName),
    tokens: deepMerge(
      parentStyles.tokens,
      tokens,
    ) as typeof parentStyles.tokens & typeof tokens,
  });
